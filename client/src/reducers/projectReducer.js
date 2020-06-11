import {
  GET_PROJECTS,
  PROJECTS_LOADING,
  GET_PROJECTS_FAIL,
  ADD_PROJECT,
  DELETE_PROJECTS,
} from '../actions/types';

const initialState = {
  projects: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        isLoading: false,
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROJECTS_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
