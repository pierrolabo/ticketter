import {
  GET_TICKETS,
  TICKETS_LOADING,
  TICKET_LOADING,
  GET_TICKETS_FAIL,
  GET_TICKET_FAIL,
  CREATE_TICKET,
  CREATE_TICKET_SUCCESS,
  UPDATE_TICKET_SUCCESS,
  CREATE_TICKET_ERROR,
  UPDATE_TICKET_FAIL,
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
    case UPDATE_TICKET_SUCCESS:
      const filteredTickets = state.tickets.map((ticket) => {
        if (ticket._id === action.payload._id) {
          return action.payload;
        }
        return ticket;
      });
      return {
        ...state,
        tickets: filteredTickets,
      };
    case GET_TICKETS_FAIL:
    case GET_TICKET_FAIL:
    case UPDATE_TICKET_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case CREATE_TICKET:
      return {
        ...state,
      };
    case CREATE_TICKET_SUCCESS:
      return {
        ...state,
        tickets: action.payload,
      };
    case CREATE_TICKET_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}
