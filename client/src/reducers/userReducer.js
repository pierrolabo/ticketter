import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_ROLE,
  USER_LOADING,
  USERS_LOADING,
  GET_USERS_FAIL,
  GET_USER_FAIL,
} from '../actions/types';

const initialState = {
  users: [],
  user: null,
  loading: false,
  loadingUser: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loadingUser: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case UPDATE_USER:
      const filteredUsers = state.users.filter(
        (user) => user._id !== action.payload._id
      );

      return {
        ...state,
        users: [action.payload, ...filteredUsers],
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case USERS_LOADING:
      return {
        ...state,
        users: [],
        loading: true,
      };
    case USER_LOADING:
      return {
        ...state,
        user: null,
        loadingUser: true,
      };
    case UPDATE_USER_ROLE:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    /*
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
      */
    case UPDATE_USER_FAIL:
      return {
        ...state,
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        users: [],
        user: null,
        loading: false,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
