import axios from "axios";
import { returnErrors } from "./errorActions.js";

//Required to push the user to home after login
import { history } from "../configureStore";
//  We cant use thunk to getState()
//  So we import it manually
import { store } from "../configureStore";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

//    Check token & load user
export const loadUser = () => (dispatch, getState) => {
  //  User loading
  dispatch({ type: USER_LOADING });
  axios
    .get("/api/auth/checkToken", tokenConfig())
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      history.push("/dashboard");
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
      "Content-Type": "application/json",
    },
  };
  //  Body
  const body = JSON.stringify({ name, lastname, email, password });

  //Request
  axios
    .post("/api/users", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      history.push("/dashboard");
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

//  Login user
export const login = ({ email, password }) => (dispatch, getState) => {
  //  Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //  Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      //redirect user to Home
      history.push("/dashboard");
    })

    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//LOGOUT User
export const logout = () => {
  history.push("/");
  return {
    type: LOGOUT_SUCCESS,
  };
};

//  Setup config/headers and token
export const tokenConfig = () => {
  //get token from localstorage
  const token = store.getState().auth.token;
  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // if tooken, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
