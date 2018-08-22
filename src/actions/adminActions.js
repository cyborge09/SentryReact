export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT';
export const PROJECT_CREATE_SUCCESS = 'PROJECT_CREATE_SUCCESS';
export const PROJECT_FETCH_SUCCESS = 'PROJECT_FETCH_SUCCESS';
export const PROJECT_DELETE_SUCCESS = 'PROJECT_DELETE_SUCCESS';
export const PROJECT_INSTANCE_FETCH_BEGIN = 'PROJECT_INSTANCE_FETCH_BEGIN';
export const PROJECT_INSTANCE_FETCH_SUCCESS = 'PROJECT_INSTANCE_FETCH_SUCCESS';
export const PROJECT_INSTANCE_FETCH_ERROR = 'PROJECT_INSTANCE_FETCH_ERROR';
export const LOG_FETCH_BEGIN = 'LOG_FETCH_BEGIN';
export const LOG_FETCH_SUCCESS = 'LOG_FETCH_SUCCESS';
export const LOG_FETCH_ERROR = 'LOG_FETCH_ERROR';
export const LOG_DELETE_SUCCESS = 'LOG_DELETE_SUCCESS';

export const PROJECT_INSTANCE_CREATE_SUCCESS =
  'PROJECT_INSTANCE_CREATE_SUCCESS';

export const PROJECT_INSTANCE_DELETE_SUCCESS =
  'PROJECT_INSTANCE_DELETE_SUCCESS';

export const setCurrentProject = projectName => ({
  type: SET_CURRENT_PROJECT,
  payload: {
    projectName: projectName,
  },
});

export const projectCreateSuccess = () => ({
  type: PROJECT_CREATE_SUCCESS,
});

export const projectFetchSuccess = data => ({
  type: PROJECT_FETCH_SUCCESS,
  payload: { data },
});

export const projectDeleteSuccess = () => ({
  type: PROJECT_DELETE_SUCCESS,
});

export const projectInstanceFetchBegin = () => ({
  type: PROJECT_INSTANCE_FETCH_BEGIN,
});

export const projectInstanceFetchSuccess = projectInstance => ({
  type: PROJECT_INSTANCE_FETCH_SUCCESS,
  payload: { data: projectInstance },
});

export const projectInstanceFetchError = error => ({
  type: PROJECT_INSTANCE_FETCH_ERROR,
  payload: { data: error },
});

export const projectInstanceDeleteSuccess = () => ({
  type: PROJECT_INSTANCE_DELETE_SUCCESS,
});
export const projectInstanceCreateSuccess = () => ({
  type: PROJECT_INSTANCE_CREATE_SUCCESS,
});

export const logFetchBegin = () => ({
  type: LOG_FETCH_BEGIN,
});

export const logFetchSuccess = logs => ({
  type: LOG_FETCH_SUCCESS,
  payload: { data: logs },
});

export const logFetchError = () => ({
  type: LOG_FETCH_ERROR,
});

export const logDeleteSuccess = () => ({
  type: LOG_DELETE_SUCCESS,
});
