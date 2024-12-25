import { isEqual } from "lodash";
import HTTPError from "../errorHandler/HTTPError.ts";

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

interface ErrorHandler {
  handler: (error: Error) => void | Promise<void>;
  set: (handler: (error: Error) => void | Promise<void>) => void;
}

class Fetcher {
  private baseUrlConfig: BaseUrlConfig;
  private headersConfig: HeadersConfig;
  private interceptors: Interceptors;
  private errorHandler: ErrorHandler;

  constructor({
    baseUrl = "",
    defaultHeaders = {},
    requestInterceptors = [],
    responseInterceptors = [],
    errorHandler = () => {},
  } = {}) {
    this.baseUrlConfig = this.createBaseUrlConfig(baseUrl);
    this.headersConfig = this.createHeadersConfig(defaultHeaders);
    this.interceptors = this.createInterceptors(
      requestInterceptors,
      responseInterceptors
    );
    this.errorHandler = this.createErrorHandler(errorHandler);
  }

  private createBaseUrlConfig(baseUrl: string): BaseUrlConfig {
    return {
      value: baseUrl,
      set: (url: string) => {
        this.baseUrlConfig.value = url;
      },
    };
  }

  private createHeadersConfig(defaultHeaders: HeadersInit): HeadersConfig {
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

  private createInterceptors(
    requestInterceptors: RequestInterceptor[],
    responseInterceptors: ResponseInterceptor[]
  ): Interceptors {
    return {
      request: {
        handlers: requestInterceptors,
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
        handlers: responseInterceptors,
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

  private createErrorHandler(
    errorHandler: (error: Error) => void | Promise<void>
  ): ErrorHandler {
    return {
      handler: errorHandler,
      set: (handler: (error: Error) => void | Promise<void>) => {
        this.errorHandler.handler = handler;
      },
    };
  }

  public addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.interceptors.request.add(interceptor);
  }

  public removeRequestInterceptors(interceptor: RequestInterceptor): void {
    this.interceptors.request.remove(interceptor);
  }

  public async interceptRequests(options: RequestInit): Promise<RequestInit> {
    let interceptedOptions: RequestInit = {
      ...options,
      headers: {
        ...(this.headersConfig.value || {}),
        ...(options.headers || {}),
      },
    };
    for (const interceptor of this.interceptors.request.handlers) {
      interceptedOptions = await interceptor(interceptedOptions);
    }
    return interceptedOptions;
  }

  public addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.interceptors.response.add(interceptor);
  }

  public removeResponseInterceptors(interceptor: ResponseInterceptor): void {
    this.interceptors.response.remove(interceptor);
  }

  public async interceptResponses<T>(
    response: Response
  ): Promise<ApiResponse<T>> {
    let interceptedResponse = response;
    for (const interceptor of this.interceptors.response.handlers) {
      interceptedResponse = await interceptor(interceptedResponse);
    }
    return interceptedResponse;
  }

  public async request<T>(
    url: string,
    options: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const interceptedOptions = await this.interceptRequests(options);
      const fetchOptions: RequestInit = {
        ...interceptedOptions,
        credentials: "include",
      };
      const requestUrl = this.baseUrlConfig.value + url;

      let response: ApiResponse<any> = await fetch(requestUrl, fetchOptions);

      const data = await this.parseResponseData(response);
      const error = this.handleError(response);

      if (error) {
        throw error;
      }

      response = await this.interceptResponses(response);
      response.data = data;

      return response;
    } catch (error) {
      if (error instanceof Error) {
        this.errorHandler.handler(error);
      }

      throw error;
    }
  }

  private async parseResponseData<T>(
    response: Response
  ): Promise<T | Blob | string> {
    const contentType = response.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    } else if (
      contentType.startsWith("image/") ||
      contentType.startsWith("application/octet-stream")
    ) {
      return response.blob();
    }

    return response.text();
  }

  private handleError(response: Response): Error | undefined {
    if (!response.ok) {
      return HTTPError.handle(response);
    }
  }

  public get<T>(
    url: string,
    options: RequestInit = {},
    params: Record<string, any> = {}
  ): Promise<ApiResponse<T>> {
    const queryString =
      params && Object.keys(params).length
        ? `?${new URLSearchParams(params).toString()}`
        : "";
    const fullUrl = `${url}${queryString}`;

    return this.request(fullUrl, { ...options, method: "GET" });
  }

  public post<T>(
    url: string,
    body = {},
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  public put<T>(
    url: string,
    body = {},
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  public patch<T>(
    url: string,
    body = {},
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  public delete<T>(
    url: string,
    body = {},
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    return this.request(url, {
      ...options,
      method: "DELETE",
      body: JSON.stringify(body),
    });
  }
}

export default Fetcher;
