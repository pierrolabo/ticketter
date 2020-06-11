import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import ticketReducer from './ticketReducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    error: errorReducer,
    auth: authReducer,
    user: userReducer,
    ticket: ticketReducer,
  });

export default createRootReducer;
