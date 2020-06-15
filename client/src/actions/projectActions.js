import axios from 'axios';
import {
  GET_PROJECTS,
  PROJECTS_LOADING,
  GET_PROJECTS_FAIL,
  ADD_PROJECT,
  DELETE_PROJECTS,
} from '../actions/types';

import { returnErrors } from './errorActions';

export const getProjects = () => (dispatch, getState) => {
  dispatch(setProjectsLoading());
  axios
    .get('/api/projects')
    .then((res) => {
      console.log('got projects: ', res);
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

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};
