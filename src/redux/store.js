import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const enhancers = [applyMiddleware(...middlewares)];
export const store = createStore(rootReducer, composeEnhancers(...enhancers));

export default store;
