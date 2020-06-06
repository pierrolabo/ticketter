import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import createRootReducer from './reducers/reducers';

export const history = createBrowserHistory();
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = persistReducer(persistConfig, createRootReducer(history));

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(routerMiddleware(history)),
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
}
