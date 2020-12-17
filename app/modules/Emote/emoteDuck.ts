import { action as typedAction, ActionType } from 'typesafe-actions';

import articleConfig, { IArticleConfig } from 'config/article.config';

// === Actions ===
enum ActionTypes {
  SET_EMOTE = 'SET_EMOTE',
}

// === Reducer ===
export interface IMostVotesState {
  key: IArticleConfig['defaultEmote'];
  votesPercentage: number;
}

const initialState: IMostVotesState = {
  /** Emote key: 1 | 2 | 3 | 4 | 5 | 6 */
  key: articleConfig.defaultEmote,
  /**
   * Votes percentage including percent symbol
   * @default 0
   */
  votesPercentage: 0,
};

export default function(state: IMostVotesState = initialState, action: Actions) {
  const { type, payload } = action;

  if (type === ActionTypes.SET_EMOTE) {
    return { key: payload.key, votesPercentage: payload.percent };
  } else {
    return state;
  }
}

// === Action Creators ===
type Actions = ActionType<typeof actions>;

export const setEmote = (mostVotedEmote: { key: IArticleConfig['defaultEmote']; percent: number }) =>
  typedAction(ActionTypes.SET_EMOTE, mostVotedEmote);

export const actions = {
  setEmote,
};
