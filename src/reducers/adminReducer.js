import {
	SET_LOGIN_SUCCESS,
	SET_LOGIN_ERROR,
	LOGOUT,
	SET_LOGIN_BEGIN,
	SET_SIGNUP_BEGIN,
	SET_SIGNUP_ERROR,
	SET_SIGNUP_SUCCESS,
	TOKEN_CHANGE,
} from '../actions/loginoutActions';

const INITIAL_STATE = {
	user: {
		isLogin: localStorage.getItem('AccessToken') ? true : false,
		accessToken: localStorage.getItem('AccessToken') || '',
		refreshToken: localStorage.getItem('RefreshToken') || '',
		loggingIn: false,
		signingUp: false,
		userEmail: localStorage.getItem('UserEmail') || '',
		userId: localStorage.getItem('UserId') || '',
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
				userId: action.payload.userId,
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
	case SET_SIGNUP_BEGIN: {
		return {
			...state,
			user: {
				...state.user,
				signingUp: true,
			},
		};
	}

	case SET_SIGNUP_SUCCESS: {
		return {
			...state,
			user: {
				...state.user,
				signingUp: false,
			},
		};
	}

	case SET_SIGNUP_ERROR: {
		return {
			...state,
			user: {
				isLogin: false,
				loggingIn: false,
				signingUp: false,
			},
		};
	}

	case LOGOUT:
		localStorage.removeItem('RefreshToken');
		localStorage.removeItem('AccessToken');
		localStorage.removeItem('UserEmail');
		localStorage.removeItem('UserId');

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
