import {
	LOG_FETCH_BEGIN,
	LOG_FETCH_SUCCESS,
	LOG_FETCH_ERROR,
	LOG_RESOLVED_CHANGED,
	LOG_DELETE_SUCCESS,
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

	case LOG_RESOLVED_CHANGED: {
		let logData = state.projectLogs.logs;

		logData.map(data => {
			if (data.id === action.payload.logId) {
				data.resolved = action.payload.resolve;
			}
		});

		return {
			...state,
			projectLogs: {
				...state.projectLogs,
				logs: logData,
			},
		};
	}
	case LOG_DELETE_SUCCESS: {
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
