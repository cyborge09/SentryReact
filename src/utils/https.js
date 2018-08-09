import axios from 'axios';
import store from '../store';
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8848/api/',
});

axiosInstance.interceptors.response.use(
  function(response) {
    // Do something with response data
    // console.log("from interceptor");
    return response;
  },
  async function(error) {
    // Do something with response error
    // const originalRequest = error.config;
    // console.log("originalRequest was ", originalRequest);
    // if (error.response.status === 401) {
    //   // console.log("User access token has expired", error.response);
    //   const accessToken = await loginService.refreshAccessToken();
    //   localStorage.setItem("accessToken", accessToken);
    //   originalRequest.headers.authorization = accessToken;
    //   return axiosInstance(originalRequest);
    // } else {
    // console.log("the error from interceptor", error.response);
    return Promise.reject(error);
    // }
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
