export const SET_LOGIN_BEGIN = 'SET_LOGIN_BEGIN';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const TOKEN_CHANGE = 'TOKEN_CHANGE';

export const setLoginSuccess = (accessToken, refreshToken, userEmail) => ({
  type: SET_LOGIN_SUCCESS,
  payload: {
    accessToken: accessToken,
    refreshToken: refreshToken,
    userEmail: userEmail,
  },
});

export const setLoginBegin = () => ({
  type: SET_LOGIN_BEGIN,
});

export const setLoginError = () => ({
  type: SET_LOGIN_ERROR,
});

export const logout = () => ({
  type: LOGOUT,
});

export const tokenChange = (accessToken, refreshToken) => ({
  type: TOKEN_CHANGE,
  payload: {
    accessToken: accessToken,
    refreshToken: refreshToken,
  },
});
