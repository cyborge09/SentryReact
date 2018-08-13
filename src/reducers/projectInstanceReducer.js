import {
  PROJECT_INSTANCE_FETCH_BEGIN,
  PROJECT_INSTANCE_FETCH_SUCCESS,
  PROJECT_INSTANCE_FETCH_ERROR,
  PROJECT_INSTANCE_DELETE_SUCCESS,
} from '../actions/adminActions';

import { LOGOUT } from '../actions/loginoutActions';

const INITIAL_STATE = {
  projectInstance: {
    data: '',
    error: '',
  },
};

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_INSTANCE_FETCH_SUCCESS: {
      return {
        ...state,
        projectInstance: {
          ...state.projectInstance,
          data: action.payload.data,
        },
      };
    }

    case PROJECT_INSTANCE_FETCH_ERROR: {
      return {
        ...state,
        projectInstance: {
          ...state.projectInstance,
          error: action.payload.data,
        },
      };
    }

    case PROJECT_INSTANCE_FETCH_BEGIN: {
      return {
        ...state,
      };
    }

    case PROJECT_INSTANCE_DELETE_SUCCESS: {
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
