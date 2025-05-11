import {useEffect, useRef} from 'react';
import {fetcherInstance} from '../../apis/fetcher';
import useAuthStorage from '../useAuthStorage';

function useAuthInterceptor() {
  const interceptorRef = useRef<
    ((options: RequestInit) => Promise<RequestInit>) | null
  >(null);
  const {accessToken} = useAuthStorage();

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
          Authorization: `Bearer ${accessToken}`,
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
  }, [accessToken]);
}

export default useAuthInterceptor;
