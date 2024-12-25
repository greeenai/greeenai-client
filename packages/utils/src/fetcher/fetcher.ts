import { isEqual } from "lodash";

type ApiResponse<T> = Response & { data?: T; success?: boolean };

type RequestInterceptor = (
  options: RequestInit
) => RequestInit | Promise<RequestInit>;

type ResponseInterceptor<T = any> = (
  response: Response
) => ApiResponse<T> | Promise<ApiResponse<T>>;

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
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private interceptors: Interceptors;

  constructor({
    baseUrl = "",
    defaultHeaders = { "Content-Type": "application/json" },
  }) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
    this.interceptors = {
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

  // 요청 인터셉터 삭제

  // 요청 인터셉터 실행

  // 응답 인터셉터 추가

  // 응답 인터셉터 삭제

  // 응답 인터셉터 삭제

  // 전체 요청

  // GET

  // POST

  // PUT

  // PATCH

  // DELETE
}

export default Fetcher;
