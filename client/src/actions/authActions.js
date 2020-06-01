import axios from 'axios';
import { returnErrors } from './errorActions.js';
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

/*
  //    Check token & load user
  export const loadUser = () => (dispatch, getState) => {

    //  User loading
    dispatch({ type: USER_LOADING})

    axios
        .get('/api/auth/', tokenConfig(getState))
        .then(res => {

        })
  }
  */

//    Register user
export const register = ({ name, email, password }) => (dispatch) => {
  //    Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //  Body
  const body = JSON.stringify({ name, email, password });

  //Request
  axios
    .post('/api/users', body, config)
    .then((res) => {
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
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
