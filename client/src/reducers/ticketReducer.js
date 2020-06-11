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

const initialState = {
  tickets: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        isLoading: false,
      };
    case TICKETS_LOADING:
    case TICKET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TICKETS_FAIL:
    case GET_TICKET_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
