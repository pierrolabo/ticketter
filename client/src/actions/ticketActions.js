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

export const setTicketsLoading = () => {
  return {
    type: TICKETS_LOADING,
  };
};
