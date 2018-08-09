export const SET_LOGIN_BEGIN = 'SET_LOGIN_BEGIN';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const ACCESSTOKEN_CHANGE = 'ACCESSTOKEN_CHANGE';

export const setLoginSuccess = (accessToken, refreshToken) => ({
  type: SET_LOGIN_SUCCESS,
  payload: {
    accessToken: accessToken,
    refreshToken: refreshToken,
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

// export const accessToken_Change = (accessToken) => ({
//     type: ACCESSTOKEN_CHANGE,
//     payload: {
//         accessToken: accessToken,
//     }
// });
