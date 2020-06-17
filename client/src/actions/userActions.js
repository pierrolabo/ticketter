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

import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { getProjects } from '../actions/projectActions';

export const getUsers = () => (dispatch, getState) => {
  dispatch(setUsersLoading());
  axios
    .get('/api/users', tokenConfig(getState))
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
