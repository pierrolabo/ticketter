import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    auth: authReducer,
    user: userReducer,
  });

export default createRootReducer;
