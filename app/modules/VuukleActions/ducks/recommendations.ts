import { action as typedAction, ActionType } from 'typesafe-actions';

import { isSameSiteNoneIncompatible, makeDevLog } from '@vuukle/utils';
import * as Cookies from 'js-cookie';
import articleConfig from '~/config/article.config';
import { recommendAPI } from '~/services/APIs';
import Communication from '~/services/Communication';

// === Actions ===
enum ActionTypes {
  SET_COUNT = '@@recommends/set_count',
  SET_LOADING = '@@recommends/set_loading',
  SET_VOTED_STATE = '@@recommends/set_voted',
}

// === Reducer ===
interface IRecommendationsState {
  readonly loading: boolean;
  readonly count: number; // number of recommends
  readonly voted: boolean; // user recommended article or no
}

const initialState: IRecommendationsState = {
  loading: false,
  count: 0,
  voted: Cookies.get(`${articleConfig.host}&${articleConfig.id}_recommend`) === 'true',
};

export default function recommendationsReducer(
  state: IRecommendationsState = initialState,
  action: Actions
): IRecommendationsState {
  switch (action.type) {
    case ActionTypes.SET_COUNT:
      return { ...state, count: action.payload };
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_VOTED_STATE:
      return { ...state, voted: action.payload };
    default:
      return state;
  }
}

// === Action Creators ===
type Actions = ActionType<typeof actions>;

export const setRecommendsCount = (count: number) => typedAction(ActionTypes.SET_COUNT, count);
export const setRecommendationsLoadingState = (loading: boolean) => typedAction(ActionTypes.SET_LOADING, loading);
export const setRecommendationsVotedState = (voted: boolean) => typedAction(ActionTypes.SET_VOTED_STATE, voted);

export const actions = {
  setRecommendsCount,
  setRecommendationsLoadingState,
  setRecommendationsVotedState,
};

// === Side Effects (thunks) ===
import { ThunkAction } from 'redux-thunk';
import { RootStore } from 'store';

export const toggleRecommend = (): ThunkAction<Promise<void>, RootStore, {}, any> => async (dispatch, getState) => {
  const { recommendations } = getState();
  const options: Cookies.CookieAttributes = isSameSiteNoneIncompatible()
    ? { expires: 30 }
    : { expires: 30, sameSite: 'none', secure: true };

  const shouldAddVote = !recommendations.voted;
  let updatedCount = shouldAddVote ? recommendations.count + 1 : recommendations.count - 1;
  if (updatedCount < 0) {
    updatedCount = 0;
  }

  dispatch(setRecommendationsLoadingState(true));
  dispatch(setRecommendsCount(updatedCount));
  dispatch(setRecommendationsVotedState(shouldAddVote));

  if (shouldAddVote) {
    Cookies.set(`${articleConfig.host}&${articleConfig.id}_recommend`, 'true', options);
  } else {
    Cookies.remove(`${articleConfig.host}&${articleConfig.id}_recommend`);
  }

  /** Sync recommendations state with other widgets */
  Communication.sendSyncRecommends(shouldAddVote, updatedCount);

  try {
    await recommendAPI(shouldAddVote);
  } catch (err) {
    makeDevLog('error', 'toggleRecommend action error:', err);
  } finally {
    dispatch(setRecommendationsLoadingState(false));
  }
};
