import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import AxiosInterceptor from './axiosInterceptor';

axios.defaults.baseURL = `/api`;

axios.interceptors.request.use(
  (req) => new AxiosInterceptor({ req }).RequestInterceptor() as InternalAxiosRequestConfig,
  (err) => new AxiosInterceptor({ err }).ErrorInterceptor()
);
axios.interceptors.response.use(
  (res) => new AxiosInterceptor({ res }).ResponseInterceptor() as AxiosResponse,
  (err) => new AxiosInterceptor({ err }).ErrorInterceptor()
);

export default axios;