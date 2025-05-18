import {
  ReactNode,
  useState,
  createContext,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import useAuthStorage from '../../../hooks/useAuthStorage';
import useAuthInterceptor from '../../../hooks/apis/useAuthInterceptor';

interface Token {
  accessToken: string | '';
  refreshToken: string | '';
}

interface AuthStateContext {
  accessToken: string | '';
  refreshToken: string | '';
  isLoggedIn: boolean;
}

interface AuthDispatchContext {
  setAuthData: any;
  clearAuthData: any;
}

const defaultStateContext: AuthStateContext = {
  accessToken: '',
  refreshToken: '',
  isLoggedIn: false,
};

const defaultDispatchContext: AuthDispatchContext = {
  setAuthData: () => {},
  clearAuthData: () => {},
};

const AuthStateContext = createContext<AuthStateContext>(defaultStateContext);

export const AuthDispatchContext = createContext<AuthDispatchContext>(
  defaultDispatchContext,
);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({children}: AuthProviderProps) {
  const [tokenState, setTokenState] = useState<Token>({
    accessToken: '',
    refreshToken: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const {getToken, setToken, clearToken} = useAuthStorage();

  const setAuthData = useCallback(
    async (accessToken: string, refreshToken: string) => {
      await setToken(accessToken, refreshToken);
      setTokenState({
        accessToken,
        refreshToken,
      });
      setIsLoggedIn(true);
    },
    [setToken],
  );

  const clearAuthData = useCallback(async () => {
    await clearToken();
    setTokenState({
      accessToken: '',
      refreshToken: '',
    });
    setIsLoggedIn(false);
  }, [clearToken]);

  const authStateContextValue = useMemo(() => {
    return {
      accessToken: tokenState?.accessToken,
      refreshToken: tokenState?.refreshToken,
      isLoggedIn,
    };
  }, [tokenState, isLoggedIn]);

  const authDispatchContextValue = useMemo(() => {
    return {
      setAuthData,
      clearAuthData,
    };
  }, [clearAuthData, setAuthData]);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const {accessToken, refreshToken} = await getToken();

        if (accessToken && refreshToken) {
          setAuthData(accessToken, refreshToken);
        }
      } catch (error) {
        console.error('토큰 로드 실패:', error);
      }
    };

    loadAuthData();
  }, [getToken, setAuthData]);

  useAuthInterceptor(tokenState.accessToken, tokenState.refreshToken);

  return (
    <AuthDispatchContext.Provider value={authDispatchContextValue}>
      <AuthStateContext.Provider value={authStateContextValue}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
}

export default AuthProvider;
