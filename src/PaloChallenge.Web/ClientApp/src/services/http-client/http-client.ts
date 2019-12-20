import Axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource
} from 'axios';
import { formatRequestQuery } from './format-request-query';

export class HttpClient {
  public static defaultConfig: AxiosRequestConfig;

  public cancelTokenSource: CancelTokenSource;

  public interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<any>>;
  };

  private config?: AxiosRequestConfig;
  private axios: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    // initialize config if does not supply
    this.cancelTokenSource = Axios.CancelToken.source();

    const tokenConfig = { cancelToken: this.cancelTokenSource.token, ...HttpClient.defaultConfig };
    const axiosConfig = config ? { ...config, ...tokenConfig } : tokenConfig;

    this.config = axiosConfig;
    this.axios = Axios.create(this.config);

    this.interceptors = {
      request: this.axios.interceptors.request,
      response: this.axios.interceptors.response
    };
  }

  public delete<TResponse = any>(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config) as AxiosPromise<TResponse>;
  }

  public head<TResponse = any>(url: string, config?: AxiosRequestConfig) {
    return this.axios.head(url, config) as AxiosPromise<TResponse>;
  }

  public request<TResponse = any>(config: AxiosRequestConfig) {
    return this.axios.request<TResponse>(config);
  }

  public get<TResponse>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<TResponse>;
  public get<TRequest, TResponse>(url: string, data?: TRequest, config?: AxiosRequestConfig): AxiosPromise<TResponse>;
  public get<TRequest = any, TResponse = any>(url: string, data?: TRequest, config?: AxiosRequestConfig) {
    if (data) { return this.axios.get<TResponse>(`${url}?${formatRequestQuery(data)}`, config); }
    return this.axios.get<TResponse>(url, config);
  }

  public post<TRequest = any, TResponse = any>(url: string, data?: TRequest, config?: AxiosRequestConfig) {
    return this.axios.post<TResponse>(url, data, config);
  }

  public put<TRequest = any, TResponse = any>(url: string, data?: TRequest, config?: AxiosRequestConfig) {
    return this.axios.put<TResponse>(url, data, config);
  }

  public patch<TRequest = any, TResponse = any>(
    url: string,
    data?: TRequest,
    config?: AxiosRequestConfig
  ) {
    return this.axios.patch<TResponse>(url, data, config);
  }
}
