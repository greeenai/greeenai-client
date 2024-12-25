import { isEqual } from "lodash";

type ApiResponse<T> = Response & { data?: T; success?: boolean };

type RequestInterceptor = (
  options: RequestInit
) => RequestInit | Promise<RequestInit>;

type ResponseInterceptor<T = any> = (
  response: Response
) => ApiResponse<T> | Promise<ApiResponse<T>>;

interface BaseUrlConfig {
  value: string;
  set: (url: string) => void;
}

interface HeadersConfig {
  value: HeadersInit;
  set: (headers: HeadersInit) => void;
  merge: (headers: HeadersInit) => void;
}

interface Interceptors {
  request: {
    handlers: RequestInterceptor[];
    add: (interceptor: RequestInterceptor) => void;
    remove: (interceptor: RequestInterceptor) => void;
  };
  response: {
    handlers: ResponseInterceptor[];
    add: (interceptor: ResponseInterceptor) => void;
    remove: (interceptor: ResponseInterceptor) => void;
  };
}

class Fetcher {
  private baseUrlConfig: BaseUrlConfig;
  private headersConfig: HeadersConfig;
  private interceptors: Interceptors;

  constructor({ baseUrl = "", defaultHeaders = {} }) {
    this.baseUrlConfig = this.createBaseUrlConfig(baseUrl);
    this.headersConfig = this.createHeadersConfig(defaultHeaders);
    this.interceptors = this.createInterceptors();
  }

  private createBaseUrlConfig(baseUrl: string) {
    return {
      value: baseUrl,
      set: (url: string) => {
        this.baseUrlConfig.value = url;
      },
    };
  }

  private createHeadersConfig(defaultHeaders: HeadersInit) {
    return {
      value: defaultHeaders,
      set: (headers: HeadersInit) => {
        this.headersConfig.value = headers;
      },
      merge: (headers: HeadersInit) => {
        this.headersConfig.value = {
          ...this.headersConfig.value,
          ...headers,
        };
      },
    };
  }

  private createInterceptors() {
    return {
      request: {
        handlers: [],
        add: (interceptor: RequestInterceptor) => {
          if (!this.interceptors.request.handlers.includes(interceptor)) {
            this.interceptors.request.handlers.push(interceptor);
          }
        },
        remove: (interceptor: RequestInterceptor) => {
          this.interceptors.request.handlers =
            this.interceptors.request.handlers.filter(
              (currentInterceptor) =>
                !isEqual(currentInterceptor.toString(), interceptor.toString())
            );
        },
      },
      response: {
        handlers: [],
        add: (interceptor: ResponseInterceptor) => {
          if (!this.interceptors.response.handlers.includes(interceptor)) {
            this.interceptors.response.handlers.push(interceptor);
          }
        },
        remove: (interceptor: ResponseInterceptor) => {
          this.interceptors.response.handlers =
            this.interceptors.response.handlers.filter(
              (currentInterceptor) =>
                !isEqual(currentInterceptor.toString(), interceptor.toString())
            );
        },
      },
    };
  }

  // 요청 인터셉터 추가
  public addRequestInterceptors() {}

  // 요청 인터셉터 삭제
  public removeRequestInterceptors() {}

  // 요청 인터셉터 실행
  public interceptRequest() {}

  // 응답 인터셉터 추가
  public addResponseInterceptors() {}

  // 응답 인터셉터 삭제
  public removeResponseInterceptors() {}

  // 응답 인터셉터 실행
  public interceptResponse() {}

  // 전체 요청
  public request() {}

  // GET
  public get() {}

  // POST
  public post() {}

  // PUT
  public put() {}

  // PATCH
  public patch() {}

  // DELETE
  public delete() {}
}

export default Fetcher;
