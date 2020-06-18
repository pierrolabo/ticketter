import {
  GET_TICKET,
  GET_TICKETS,
  TICKET_LOADING,
  TICKETS_LOADING,
  GET_TICKET_FAIL,
  GET_TICKETS_FAIL,
  GET_TICKET_SUCCESS,
  CREATE_TICKET,
  CREATE_TICKET_SUCCESS,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
  CREATE_TICKET_ERROR,
  ADD_REPLY,
  ADD_REPLY_FAIL,
  DELETE_REPLY,
  DELETE_REPLY_FAIL,
} from '../actions/types';

const initialState = {
  tickets: [],
  ticket: {},
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_REPLY:
      return {
        ...state,
        ticket: action.payload,
      };
    case DELETE_REPLY_FAIL:
      return {
        ...state,
      };
    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
        isLoading: false,
      };
    case GET_TICKET:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TICKET_SUCCESS:
      return {
        ...state,
        ticket: action.payload[0],
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
    case ADD_REPLY:
      console.log('reducer: ', action.payload);
      return {
        ...state,
        ticket: action.payload,
      };
    case ADD_REPLY_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
