import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
// defaults to localStorage for web
import storage from 'redux-persist/lib/storage';

import createRootReducer from './reducers/reducers';

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = persistReducer(persistConfig, createRootReducer(history));

const middleware = [thunk, routerMiddleware(history)];
const middlewareEnhancer = applyMiddleware(...middleware);
const composedEnhancer = compose(
  middlewareEnhancer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(rootReducer, composedEnhancer);
const persistor = persistStore(store);
export { persistor, store };
