import axios from 'axios';
import {
  GET_PROJECTS,
  PROJECTS_LOADING,
  GET_PROJECTS_FAIL,
  UPDATE_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  ADD_PROJECT,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  CLEAR_PROJECTS,
} from '../actions/types';

import { returnErrors } from './errorActions';
import { history } from '../configureStore';

//  We cant use thunk to getState()
//  So we import it manually
import { store } from '../configureStore';

export const clearProjects = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROJECTS,
  });
};
export const getProjects = () => (dispatch, getState) => {
  dispatch(setProjectsLoading());
  axios
    .get('/api/projects', tokenConfig())
    .then((res) => {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_PROJECTS_FAIL,
      });
    });
};

export const updateProject = ({ name, description, _id, nextUsers }) => (
  dispatch,
  getState
) => {
  dispatch({ type: UPDATE_PROJECT });
  //    Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // body request
  const body = JSON.stringify({
    name,
    description,
    _id,
    nextUsers,
  });
  axios
    .put('/api/projects', body, config)
    .then((res) => {
      dispatch({
        type: UPDATE_PROJECT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: UPDATE_PROJECT_FAIL,
      });
    });
};
export const addProject = ({ name, description }) => (dispatch, getState) => {
  dispatch({ type: ADD_PROJECT });
  //    Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // body request
  const body = JSON.stringify({
    name,
    description,
  });

  axios
    .post('/api/projects', body, config)
    .then((res) => {
      dispatch({
        type: ADD_PROJECT_SUCCESS,
        payload: res.data,
      });
      history.push('/projects/view');
    })
    .catch((err) => {
      console.log('error, ', err);
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ADD_PROJECT_FAIL')
      );
      dispatch({
        type: ADD_PROJECT_FAIL,
      });
    });
};
export const deleteProject = (id) => (dispatch, getState) => {
  dispatch({ type: DELETE_PROJECT });
  axios
    .delete(`/api/projects/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_PROJECT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log('error, ', err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'DELETE_PROJECT_FAIL'
        )
      );
      dispatch({
        type: DELETE_PROJECT_FAIL,
      });
    });
};
export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
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
    console.log('we have a token: ', token);
  }
  console.log('config: ', config);
  return config;
};
