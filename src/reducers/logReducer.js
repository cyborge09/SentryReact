import {
  LOG_FETCH_BEGIN,
  LOG_FETCH_ERROR,
  LOG_FETCH_SUCCESS,
} from '../actions/logAction';
import { LOGOUT } from '../actions/loginoutActions';

const INITIAL_STATE = {
  isLogFetching: false,
  logList: [],
};

const logReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_FETCH_BEGIN: {
      return {
        ...state,
        log: {
          isLogFetching: true,
        },
      };
    }

    case LOG_FETCH_SUCCESS: {
      return {
        ...state,
        log: {
          ...state.log,
          list: action.payload.data,
        },
      };
    }

    case LOG_FETCH_ERROR: {
      return {
        ...state,
        log: {
          ...state.log,
          isLogFetching: false,
        },
      };
    }

    case LOGOUT: {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
};

export default logReducer;
