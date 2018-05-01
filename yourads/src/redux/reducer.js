import { Map, fromJS } from 'immutable';
import { loop, combineReducers } from 'redux-loop-symbol-ponyfill';

// ## Import Your State Reducers
import NavigatorStateReducer from '../modules/navigator/navigator.state';
import PublicNewsJobStateReducer from '../modules/newsjob/public-newsjob.state';
import AuthStateReducer from '../modules/auth/auth.state';
import SessionStateReducer, { RESET_STATE } from '../modules/session/session.state';
import HomeStateReducer from '../modules/home/home.state';
import MakeVideStateReducer from '../modules/make-video/make-video.state';
import BuyVideoStateReducer from '../modules/buy-video/buy-video.state';

const reducers = {
  // ## Generator Reducers
  navigatorState: NavigatorStateReducer,
  authState: AuthStateReducer,
  homeState: HomeStateReducer,
  publicNewsJob: PublicNewsJobStateReducer,
  makeVideo: MakeVideStateReducer,
  buyVideo: BuyVideoStateReducer,
  session: SessionStateReducer,
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}