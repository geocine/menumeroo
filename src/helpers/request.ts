import axios, { AxiosInstance, CancelTokenStatic } from 'axios';
import history from '../helpers/history';

type MAxiosInstance = {
  CancelToken?: CancelTokenStatic;
  isCancel?: (value: any) => boolean;
};

const axiosRequest = (opts = {}, optsHeader = {}) => {
  const token = localStorage.getItem('accessToken');
  const defaultOptions = {
    ...opts,
    headers: !token
      ? optsHeader
      : {
          ...optsHeader,
          Authorization: `Bearer ${token}`
        }
  };

  const axiosApi: MAxiosInstance & AxiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    ...defaultOptions
  });

  axiosApi.CancelToken = axios.CancelToken;
  axiosApi.isCancel = axios.isCancel;

  axiosApi.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        history.replace('/login');
      }

      return Promise.reject(error);
    }
  );
  return axiosApi;
};

// execute through .exec(), cancel through .cancel()
const post = <T extends unknown>(url: string, body = {}, opts = {}) => {
  const { CancelToken, post: axiosPost } = axiosRequest();
  const source = CancelToken!.source();
  return {
    exec: () =>
      axiosPost<T>(url, body, {
        ...opts,
        cancelToken: source.token
      }),
    cancel: () => source.cancel()
  };
};

const put = <T extends unknown>(url: string, body = {}, opts = {}) => {
  const { CancelToken, put: axiosPut } = axiosRequest();
  const source = CancelToken!.source();
  return {
    exec: () =>
      axiosPut<T>(url, body, {
        ...opts,
        cancelToken: source.token
      }),
    cancel: () => source.cancel()
  };
};

const patch = <T extends unknown>(url: string, body = {}, opts = {}) => {
  const { CancelToken, patch: axiosPatch } = axiosRequest();
  const source = CancelToken!.source();
  return {
    exec: () =>
      axiosPatch<T>(url, body, {
        ...opts,
        cancelToken: source.token
      }),
    cancel: () => source.cancel()
  };
};

const get = <T extends unknown>(url: string, opts = {}) => {
  const { CancelToken, get: axiosGet } = axiosRequest();
  const source = CancelToken!.source();
  return {
    exec: () =>
      axiosGet<T>(url, {
        ...opts,
        cancelToken: source.token
      }),
    cancel: () => source.cancel()
  };
};

const remove = <T extends unknown>(url: string, opts = {}) => {
  const { CancelToken, delete: axiosDelete } = axiosRequest();
  const source = CancelToken!.source();
  return {
    exec: () =>
      axiosDelete<T>(url, {
        ...opts,
        cancelToken: source.token
      }),
    cancel: () => source.cancel()
  };
};

export const request = {
  put,
  post,
  get,
  patch,
  delete: remove
};
