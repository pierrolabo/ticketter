import axios from 'axios';
import { returnErrors } from './errorActions.js';

//Required to push the user to home after login
import { history } from '../configureStore';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
} from './types';

//    Check token & load user
export const loadUser = () => (dispatch, getState) => {
  //  User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/checkToken', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//    Register user
export const register = ({ name, lastname, email, password }) => (dispatch) => {
  //    Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //  Body
  const body = JSON.stringify({ name, lastname, email, password });

  //Request
  axios
    .post('/api/users', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      history.push('/home');
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//  Login user
export const login = ({ email, password }) => (dispatch) => {
  //  Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //  Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      //redirect user to Home
      history.push('/home');
    })

    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//  Setup config/headers and token
export const tokenConfig = (getState) => {
  //get token from localstorage
  const token = getState().auth.token;
  //Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  //  if tooken, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};

//LOGOUT User
export const logout = () => {
  history.push('/');
  return {
    type: LOGOUT_SUCCESS,
  };
};
