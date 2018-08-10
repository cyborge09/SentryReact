import axios from 'axios';
import store from '../store';
import { tokenChange } from '../actions/loginoutActions';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8848/api/',
});

axiosInstance.interceptors.response.use(
  response => {
    // Do something with response data
    console.log('from interceptor', response);
    return response;
  },
  async error => {
    console.log('error', error.response.status);
    // Do something with response error

    const originalRequest = error.config;

    if (error.response.status === 401) {
      console.log('inside');
      let res = await axios({
        method: 'post',
        url: 'http://127.0.0.1:8848/api/auth/refresh',
        headers: {
          'Content-Type': 'application/json',
          refreshToken: store.getState().login.user.refreshToken,
        },
      });
      //save to locals
      localStorage.setItem('AccessToken', res.data.access);
      localStorage.setItem('RefreshToken', res.data.refresh);

      //dispatch Change token
      store.dispatch(tokenChange(res.data.access, res.data.refresh));
      originalRequest.headers.authorization = res.data.access;
      return axiosInstance(originalRequest);
    }
  }
);

const setHeader = headers => {
  return (headers = {
    ...headers,
    authorization: store.getState().login.user.accessToken,
  });
};

export function get(url, headers = {}, params = {}) {
  headers = setHeader(headers);
  return axiosInstance({
    method: 'get',
    url,
    headers,
    params,
  });
}

export function post(url, data, headers = {}, params = {}) {
  headers = setHeader(headers);
  return axiosInstance({
    method: 'post',
    url,
    data,
    headers,
    params,
  });
}

export function remove(url, headers = {}) {
  headers = setHeader(headers);
  return axiosInstance({
    method: 'delete',
    url,
    headers,
  });
}
