import {
  LOG_FETCH_BEGIN,
  LOG_FETCH_SUCCESS,
  LOG_FETCH_ERROR,
} from '../actions/adminActions';

import { LOGOUT } from '../actions/loginoutActions';

const INITIAL_STATE = {
  projectLogs: {
    logs: '',
    error: '',
  },
};

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_FETCH_SUCCESS: {
      return {
        ...state,
        projectLogs: {
          ...state.projectLogs,
          logs: action.payload.data,
        },
      };
    }

    case LOG_FETCH_ERROR: {
      return {
        ...state,
        projectInstance: {
          ...state.projectInstance,
          error: action.payload.data,
        },
      };
    }

    case LOG_FETCH_BEGIN: {
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
