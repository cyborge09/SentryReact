import {
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR,
  LOGOUT,
  ACCESSTOKEN_CHANGE,
  SET_LOGIN_BEGIN,
} from '../actions/loginoutActions';

const INITIAL_STATE = {
  user: {
    isLogin: localStorage.getItem('AccessToken') ? true : false,
    accessToken: localStorage.getItem('AccessToken') || '',
    refreshToken: localStorage.getItem('RefreshToken') || '',
    loggingIn: false,
  },
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOGIN_BEGIN: {
      return {
        ...state,
        user: {
          ...state.user,
          loggingIn: true,
        },
      };
    }

    case SET_LOGIN_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          isLogin: localStorage.getItem('AccessToken') ? true : false,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
          loggingIn: false,
        },
      };
    }

    case SET_LOGIN_ERROR: {
      return {
        ...state,
        user: {
          isLogin: false,
          loggingIn: false,
        },
      };
    }

    case LOGOUT:
      return {
        ...state,
        user: {
          ...state.user,
          isLogin: false,
          accessToken: '',
          refreshToken: '',
        },
      };

    case ACCESSTOKEN_CHANGE:
      return {
        ...state,
        user: {
          ...state.user,
          accessToken: action.payload.accessToken,
        },
      };

    default:
      return state;
  }
};

export default loginReducer;
