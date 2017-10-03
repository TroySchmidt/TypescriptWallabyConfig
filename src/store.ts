import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'router5';
import { router5Middleware, router5Reducer } from 'redux-router5';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as currentUser } from './modules/login';
import { reducer as mapping } from './modules/mapping';

/* ignore codecoverage */
// tslint:disable-next-line:no-any
export default function configureStore(router: Router, initialState: any = {}) {

  // tslint:disable-next-line:no-any
  const composeEnhancers: any = (process.env.NODE_ENV !== 'production' 
    || process.env.REACT_APP_PUBLISH_DESTINATION === 'dev-server' 
    || process.env.REACT_APP_PUBLISH_DESTINATION === 'stage-server')
    ? composeWithDevTools
    : compose;

  // tslint:disable-next-line
  const enhancer = composeEnhancers(applyMiddleware(router5Middleware(router), thunk));

  const reducers = combineReducers({
    router: router5Reducer,
    currentUser,
    mapping,
  });
  const store = createStore(reducers, initialState, enhancer);

  (<any> window).store = store; //tslint:disable-line
  return store;
}