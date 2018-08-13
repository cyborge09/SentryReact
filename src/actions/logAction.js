export const LOG_FETCH_SUCCESS = 'LOG_FETCH_SUCCESS';
export const LOG_FETCH_BEGIN = 'LOG_FETCH_BEGIN';
export const LOG_FETCH_ERROR = 'LOG_FETCH_ERROR';

export const logFetchSuccess = data => ({
  type: LOG_FETCH_SUCCESS,
  payload: { data },
});

export const logFetchBegin = () => ({
  type: LOG_FETCH_BEGIN,
});

export const logFetchError = msg => ({
  type: LOG_FETCH_ERROR,
  payload: {
    message: msg,
  },
});
