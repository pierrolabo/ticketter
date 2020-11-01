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
  CLEAR_TICKET,
  COMPLETED_TICKET,
  UPDATE_ASSIGNED_TO,
  DELETE_TICKET_FAIL,
  DELETE_TICKET,
} from "../actions/types";

const initialState = {
  tickets: [],
  ticket: {
    _id: 1,
    status: "loading",
    assigned_to: 1,
    completed_by: "fake",
    isCompleted: false,
    projectID: 1,
    title: "fake",
    description: "fake",
    created_by: "fake",
    date: Date.now,
    answers: [],
  },
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket._id !== action.payload
        ),
      };
    case DELETE_TICKET_FAIL:
      return {
        ...state,
      };
    case UPDATE_ASSIGNED_TO:
      return {
        ...state,
        ticket: action.payload,
      };
    case COMPLETED_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket._id !== action.payload._id
        ),
        ticket: action.payload,
      };
    case DELETE_REPLY:
      return {
        ...state,
        ticket: action.payload,
      };
    case CLEAR_TICKET:
      return {
        ...state,
        ticket: [],
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
        project: [],
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
