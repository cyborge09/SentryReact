import {
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR,
  LOGOUT,
  ACCESSTOKEN_CHANGE,
  SET_LOGIN_BEGIN,
  TOKEN_CHANGE,
} from '../actions/loginoutActions';

const INITIAL_STATE = {
  user: {
    isLogin: localStorage.getItem('AccessToken') ? true : false,
    accessToken: localStorage.getItem('AccessToken') || '',
    refreshToken: localStorage.getItem('RefreshToken') || '',
    loggingIn: false,
    userEmail: localStorage.getItem('UserEmail') || '',
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
          userEmail: action.payload.userEmail,
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

    case TOKEN_CHANGE:
      return {
        ...state,
        user: {
          ...state.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
      };

    default:
      return state;
  }
};

export default loginReducer;
