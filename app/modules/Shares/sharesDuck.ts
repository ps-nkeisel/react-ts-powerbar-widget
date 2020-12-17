import { action as typedAction, ActionType } from 'typesafe-actions';

import articleConfig from 'config/article.config';
import userConfig from 'config/user.config';

// === Actions ===
export enum ActionTypes {
  SET_CUSTOM_LINKS = '@@shares/set_links',
  SET_SHARES_COUNT = '@@shares/set',
  TOGGLE = '@@shares/toggle',
}

// === Reducer ===
/** Most voted emote which we receive from emotes widget */
export interface ISharesCounters {
  facebook: number;
  reddit: number;
  twitter: number;
  linkedin: number;
}

export interface ISharesCustomLinks {
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  messenger?: string;
  whatsapp?: string;
  flipboard?: string;
  pinterest?: string;
  reddit?: string;
  telegram?: string;
}

export interface ISharesState {
  items: Array<{ name: SocialName; count: number }>;
  totalShares: number;

  customLinks: ISharesCustomLinks | null;
  toggled: boolean;
}

const mobileOnlySocialNetworksRegexp = /^(messenger)$/;
const initialState: ISharesState = {
  items: articleConfig.shareItems
    // If it's mobile we need to hide a few social networks
    .filter((name) => (userConfig.isMobile ? name : !mobileOnlySocialNetworksRegexp.test(name)))
    // Now change structure of items to be more consistent
    .map((name) => ({ name, count: 0 })),
  totalShares: 0,
  /** Object with social names properties and url strings as values for social sharing actions */
  customLinks: null,
  /* Used when more button is available (toggles shares block to show more shares) */
  toggled: false,
};

export default function(state: ISharesState = initialState, action: Actions): ISharesState {
  switch (action.type) {
    case ActionTypes.SET_CUSTOM_LINKS:
      return { ...state, customLinks: action.payload };
    case ActionTypes.SET_SHARES_COUNT:
      const sharesObj = action.payload;
      return {
        ...state,
        items: state.items.map(({ name }) => ({ name, count: sharesObj[name] || 0 })),
        totalShares: Object.values(sharesObj).reduce<number>((a: number, b: number) => a + b, 0),
      };
    case ActionTypes.TOGGLE:
      return { ...state, toggled: !state.toggled };
    default:
      return state;
  }
}

// === Action Creators ===
export const setCustomLinks = (customLinks: ISharesCustomLinks) =>
  typedAction(ActionTypes.SET_CUSTOM_LINKS, customLinks);

export const setSharesCounters = (sharesCounters: ISharesCounters) =>
  typedAction(ActionTypes.SET_SHARES_COUNT, sharesCounters);

export const toggleShares = () => typedAction(ActionTypes.TOGGLE, {});

export type Actions = ActionType<typeof actions>;
export const actions = {
  setCustomLinks,
  setSharesCounters,
  toggleShares,
};

// === Side Effects ===
