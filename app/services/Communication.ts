/**
 * @file This file contains class to setup communication of this widget within iframe
 * Several examples of communication:
 * - Powerbar doesn't have API calls to get number of shares or comments. Instead it received message from another widget and then it sets received counters
 * - Other widgets have recommend button too. So on recommendation click powerbar share current state with other widgets so they can highlight button or remove hightlight when needed. And Powerbar also receive message about any changes and do needed things.
 * - Send messages about height changes so upper JS (creator of widgets) can resize the iframe.
 */
import { makeDevLog } from '@vuukle/utils';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

import { setStyles } from '~/modules/global';

import { setEmote } from '~/modules/Emote/emoteDuck';
import { setCustomLinks, setSharesCounters } from '~/modules/Shares/sharesDuck';
import { setComments } from '~/modules/VuukleActions/ducks/comments';
import { setRecommendationsVotedState, setRecommendsCount } from '~/modules/VuukleActions/ducks/recommendations';

import store from '~/store';

import articleConfig from '~/config/article.config';
import { openShareWindow } from '~/modules/Shares/utils';

declare var Porthole: any;

interface IWindowProxy {
  addEventListener: (callback: (event: any) => void) => void;
  post: (data: object) => void;
}

class Communication {
  /** Determines if this.init() has been called */
  private initialized: boolean = false;
  /** ⚠ Porthole instance to send and receive events */
  public windowProxy: IWindowProxy =
    process.env.NODE_ENV !== 'test'
      ? new Porthole.WindowProxy(window.location.href)
      : { addEventListener: () => null, post: (data: any) => makeDevLog(data, 'log') };

  /**
   * Main init method - creates windowProxy, creates listeners.
   * @return void
   */
  public init(): void {
    /** Prevent init from being called several times */
    if (this.initialized) {
      makeDevLog('error', 'Communication has been initialized already.');
    } else {
      this.initialized = true;
    }

    /** ⚠ Attach event listener to receive messages about any changes from other widgets */
    this.windowProxy.addEventListener(this.listener);

    /** Attach windowProxy to window object in dev mode so it's possible to mock messages */
    if (process.env.NODE_ENV === 'development') {
      (window as any).windowProxy = this.windowProxy;
    }
  }

  /**
   * Share sharing action with platform.js
   * @param {string} socialName - social network name
   * @return {void}
   */
  public sendLogShare(socialName: SocialName): void {
    const actionWithName = {
      action: 'share',
      medium: socialName,
    };
    const callInterceptor = {
      social: socialName,
      url: articleConfig.url,
      title: articleConfig.title,
    };
    this.windowProxy.post({
      reportEvent: {
        action: `share_${socialName}`,
        label: 'Powerbar',
      },
      vuukle_event: {
        eventType: 'powerbar',
        ...actionWithName,
      },
      ...(articleConfig.enableInterceptor ? { callInterceptor } : {}),
    });
  }

  /** Send a message to platform whenever the 'more' button is clicked */
  public sendToggleLog(): void {
    this.windowProxy.post({
      reportEvent: {
        action: 'powerbar_more',
        label: 'Powerbar',
      },
    });
  }

  /**
   * Send porthole message to scroll to comments
   * @param {'comments' | 'emotes'} to - widget name to scroll to
   * @return {void}
   */
  public sendScrollTo(to: 'comments' | 'emotes'): void {
    this.windowProxy.post({ scrollTo: to });
  }

  /**
   * Send porthole message to open link in browser
   * @param {string} link - link to open
   */
  public sendOpenLink(link: string) {
    this.windowProxy.post({ openBrowserLink: link });
  }

  /**
   * Sync recommendations with other widgets
   * @param {boolean} voted - user recommended
   * @param {number} votes - updated recommends count
   */
  public sendSyncRecommends(voted: boolean, votes: number) {
    this.windowProxy.post({ syncWidget: { voted, votes } });
  }

  /**
   * Listener callback to perform actions once any of the valid messages received
   * @param {any} event - event that we can to receive
   * @return void
   */
  private listener = (event: any): void => {
    // First validate this event
    if (!event || !event.data) {
      return;
    }
    // Log received message in dev mode
    makeDevLog('log', `[POWERBAR] Porthole message received`);
    makeDevLog('log', event);

    if (event instanceof Object && event.data instanceof Object && event.data.powerbarStyles instanceof Object) {
      store.dispatch(setStyles(event.data.powerbarStyles));
    }

    /**
     * Main powerbar data is sent with key: `powerBarData`
     * It contains comments count, recommendations and shares.
     */
    if (path(['data', 'powerBarData'], event)) {
      /** let parent know that we have received data */
      this.windowProxy.post({ powerbarAcknowledge: true });
      const dataForPowerbar = event.data.powerBarData;

      store.dispatch(setComments(parseInt(dataForPowerbar.commentCount, 10) || 0)); // update comments count in the store

      Communication.setRecommendations(parseInt(dataForPowerbar.recommendations, 10) || 0);

      store.dispatch(
        setSharesCounters({
          facebook: pathOr(0, ['shares', 'Facebook', 'total_count'], dataForPowerbar),
          linkedin: pathOr(0, ['shares', 'LinkedIn'], dataForPowerbar),
          reddit: pathOr(0, ['shares', 'Reddit'], dataForPowerbar),
          twitter: pathOr(0, ['shares', 'Twitter'], dataForPowerbar),
        })
      );
    } else if (path(['data', 'shareURLS'], event)) {
      /**
       * Here we receive custom links publisher can add in configuration
       * we need to replace it with ours default
       */
      /** let parent know that we have received data */
      this.windowProxy.post({ powerBarURLAcknowledge: true });
      store.dispatch(setCustomLinks(event.data.shareURL)); // Update links in the store
    } else if (path(['data', 'syncWidget', 'commentAdded'], event)) {
      /** Comment has been added in another widget */
      store.dispatch(setComments(store.getState().comments + 1)); // update comments count in the store
    } else if (path(['data', 'syncWidget', 'mostVotedEmote'], event) instanceof Object) {
      /**
       * Inside this shares widget we need only most voted emote to display,
       * so we receive it as object with key and percent number
       */
      store.dispatch(setEmote(event.data.syncWidget.mostVotedEmote));
    } else if (typeof path(['data', 'syncWidget', 'votes'], event) === 'number') {
      /** Here we received updated recommendations count with votes and voted true/false message */
      Communication.setRecommendations(event.data.syncWidget.votes, event.data.syncWidget.voted);
    } else if (typeof path(['data', 'syncWidget', 'addCommentsToCounter'], event) === 'number') {
      store.dispatch(setComments(store.getState().comments + event.data.syncWidget.addCommentsToCounter));
    } else if (path(['data', 'intercept'], event) instanceof Object) {
      /** Once the intercept call is returned, the share interceptor should be called if it exists */
      if (articleConfig.enableInterceptor) {
        // Take the data
        const shareData = event.data.intercept;
        // Call the function. If url or title or both aren't given, the function will use defaults anyway
        openShareWindow(shareData.social, shareData.url, shareData.title);
      }
    }
  };

  /**
   * Set recommendations count and voted yes/no in redux store
   * @return {void}
   */
  private static setRecommendations(count: number, recommended?: boolean): void {
    store.dispatch(setRecommendsCount(count));
    if (typeof recommended !== 'undefined') {
      store.dispatch(setRecommendationsVotedState(recommended));
    }
  }
}

export default new Communication();
