import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { StateType } from 'typesafe-actions';

import global from '~/modules/global';

import emote from '~/modules/Emote/emoteDuck';
import shares from '~/modules/Shares/sharesDuck';
import comments from '~/modules/VuukleActions/ducks/comments';
import recommendations from '~/modules/VuukleActions/ducks/recommendations';

const rootReducer = combineReducers({
  emote,
  global,
  shares,
  comments,
  recommendations,
});

// === Create Store
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // setup redux devtools
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type RootStore = StateType<typeof rootReducer>;

export default store;
