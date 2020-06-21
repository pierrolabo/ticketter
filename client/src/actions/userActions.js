import axios from 'axios';
import {
  GET_USERS,
  GET_USER,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  USER_LOADING,
  USERS_LOADING,
  GET_USERS_FAIL,
  GET_USER_FAIL,
} from './types';

//import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { getProjects } from '../actions/projectActions';

//  We cant use thunk to getState()
//  So we import it manually
import { store } from '../configureStore';

export const getUsers = () => (dispatch, getState) => {
  dispatch(setUsersLoading());
  axios
    .get('/api/users', tokenConfig())
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_USERS_FAIL,
      });
    });
};

export const getUserById = (id) => (dispatch, getState) => {
  dispatch(setUserLoading());

  axios
    .get(`/api/users/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data[0],
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_USER_FAIL,
      });
    });
};
export const setUsersLoading = () => {
  return {
    type: USERS_LOADING,
  };
};
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const updateUser = (user) => (dispatch, getState) => {
  axios
    .put('/api/users', user, tokenConfig(getState))
    .then((res) => {
      dispatch(getProjects());
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: UPDATE_USER_FAIL,
      });
    });
};
//  Setup config/headers and token
export const tokenConfig = () => {
  //get token from localstorage
  const token = store.getState().auth.token;
  //Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // if tooken, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};
