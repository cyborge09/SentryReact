import { SET_LOGIN_SUCCESS, SET_LOGIN_ERROR, LOGOUT, ACCESSTOKEN_CHANGE } from '../actions/loginoutActions';

const INITIAL_STATE = {
    user: {
        islogin: (localStorage.getItem("AccessToken")) ? true : false,
        accessToken: localStorage.getItem("AccessToken") || '',
        refreshToken: localStorage.getItem("RefreshToken") || ''
    }
};


const loginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOGIN_SUCCESS:
            {
                return {
                    ...state,
                    user: {
                        ...state.user, islogin: true,
                        accessToken: action.payload.accessToken,
                        refreshToken: action.payload.refreshToken
                    }

                }
            }

        case SET_LOGIN_ERROR:
            {
                return {
                    ...state,
                    user: {
                        islogin: false
                    }
                }
            }

        case LOGOUT:
            return {
                ...state,
                user: {
                    ...state.user, islogin: false,
                    accessToken: '',
                    refreshToken: ''
                }
            }

        case ACCESSTOKEN_CHANGE:
            return {
                ...state,
                user: {
                    ...state.user,
                    accessToken: action.payload.accessToken
                }
            }


        default:
            return state;
    }
}


export default loginReducer;