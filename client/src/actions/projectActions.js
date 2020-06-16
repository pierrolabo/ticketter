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
  DELETE_PROJECTS,
} from '../actions/types';

import { returnErrors } from './errorActions';
import { history } from '../configureStore';

export const getProjects = () => (dispatch, getState) => {
  dispatch(setProjectsLoading());
  axios
    .get('/api/projects')
    .then((res) => {
      console.log(res.data);
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

export const updateProject = ({ name, description, _id }) => (
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
export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};