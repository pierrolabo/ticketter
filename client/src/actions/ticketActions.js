import axios from 'axios';

import {
  GET_TICKET,
  GET_TICKETS,
  TICKETS_LOADING,
  TICKET_LOADING,
  GET_TICKETS_FAIL,
  GET_TICKET_FAIL,
  ADD_TICKET,
  DELETE_TICKET,
  UPDATE_TICKET,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
} from '../actions/types';

import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getTickets = () => (dispatch, getState) => {
  dispatch(setTicketsLoading());
  axios
    .get('/api/tickets')
    .then((res) => {
      dispatch({
        type: GET_TICKETS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: GET_TICKETS_FAIL,
      });
    });
};

export const updateTicket = ({
  id,
  title,
  description,
  assigned_to,
  projectID,
  status,
  nextProjID,
}) => (dispatch, getState) => {
  //    Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // body request
  const body = JSON.stringify({
    title,
    description,
    assigned_to,
    projectID,
    status,
    nextProjID,
  });
  dispatch(setTicketsLoading());
  axios
    .put(`/api/tickets/${id}`, body, config)
    .then((res) => {
      dispatch({
        type: UPDATE_TICKET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          'UPDATE_TICKET_FAIL'
        )
      );
      dispatch({
        type: UPDATE_TICKET_FAIL,
      });
    });
};
export const setTicketsLoading = () => {
  return {
    type: TICKETS_LOADING,
  };
};
