import {useEffect, useRef} from 'react';
import {fetcherInstance} from '../../apis/fetcher';

function useAuthInterceptor(accessToken: string, refreshToken: string) {
  const interceptorRef = useRef<
    ((options: RequestInit) => Promise<RequestInit>) | null
  >(null);
  useEffect(() => {
    if (interceptorRef.current) {
      fetcherInstance.removeRequestInterceptors(interceptorRef.current);
      interceptorRef.current = null;
    }

    const authRequestInterceptor = async (
      options: RequestInit,
    ): Promise<RequestInit> => {
      if (!accessToken) {
        return options;
      }

      return {
        ...options,
        headers: {
          ...options.headers,
          accessToken,
          refreshToken,
        },
      };
    };

    fetcherInstance.addRequestInterceptor(authRequestInterceptor);
    interceptorRef.current = authRequestInterceptor;

    return () => {
      if (interceptorRef.current) {
        fetcherInstance.removeRequestInterceptors(interceptorRef.current);
        interceptorRef.current = null;
      }
    };
  }, [accessToken, refreshToken]);
}

export default useAuthInterceptor;
