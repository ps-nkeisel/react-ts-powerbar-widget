import { action as typedAction, ActionType } from 'typesafe-actions';

// === Actions ===
enum ActionTypes {
  SET_COMMENTS_COUNT = '@@comments/set_count',
}

// === Reducer ===
export default function(state: number = 0, action: Actions): number {
  return action.type === ActionTypes.SET_COMMENTS_COUNT ? action.payload : state;
}

// === Action Creators ==
type Actions = ActionType<typeof actions>;

export const setComments = (count: number) => typedAction(ActionTypes.SET_COMMENTS_COUNT, count);

export const actions = {
  setComments,
};
