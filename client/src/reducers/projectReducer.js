import {
  GET_PROJECTS,
  PROJECTS_LOADING,
  GET_PROJECTS_FAIL,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  ADD_PROJECT,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  CLEAR_PROJECTS,
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
    case UPDATE_PROJECT_SUCCESS:
      const filteredProjects = state.projects.map((project) => {
        if (project._id === action.payload._id) {
          return action.payload;
        }
        return project;
      });
      return {
        ...state,
        projects: filteredProjects,
      };
    case UPDATE_PROJECT_FAIL:
    case UPDATE_PROJECT:
      return {
        ...state,
      };
    case ADD_PROJECT:
    case ADD_PROJECT_FAIL:
      return {
        ...state,
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [state.projects, action.payload.project],
      };
    case DELETE_PROJECT:
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload.id
        ),
      };
    case CLEAR_PROJECTS:
      return {
        ...state,
        projects: [],
      };
    default:
      return state;
  }
}
