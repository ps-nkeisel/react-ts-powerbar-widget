import { action as typedAction, ActionType } from 'typesafe-actions';

// === Actions ===
enum ActionTypes {
  SET_STYLES_OBJECT = '@@global/set_styles_object',
}

// === Reducer ===
export default function(state: object = {}, action: Actions): object {
  return action.type === ActionTypes.SET_STYLES_OBJECT ? action.payload : state;
}

// === Action Creators ==
type Actions = ActionType<typeof actions>;

export const setStyles = (styles: object) => typedAction(ActionTypes.SET_STYLES_OBJECT, styles);

export const actions = {
  setStyles,
};
