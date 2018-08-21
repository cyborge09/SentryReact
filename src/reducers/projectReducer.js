import {
  SET_CURRENT_PROJECT,
  PROJECT_FETCH_SUCCESS,
  PROJECT_DELETE_SUCCESS,
  PROJECT_CREATE_SUCCESS,
} from '../actions/adminActions';

import { LOGOUT } from '../actions/loginoutActions';

const INITIAL_STATE = {
  project: {
    currentProject: '',
    data: '',
  },
};

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_PROJECT: {
      return {
        ...state,
        project: {
          ...state.project,
          currentProject: action.payload.projectName,
        },
      };
    }

    case PROJECT_FETCH_SUCCESS: {
      return {
        ...state,
        project: {
          ...state.project,
          data: action.payload.data,
        },
      };
    }

    case PROJECT_DELETE_SUCCESS: {
      return {
        ...state,
      };
    }

    case PROJECT_CREATE_SUCCESS: {
      return {
        ...state,
      };
    }

    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
export default projectReducer;
