import AsyncStorageService from '../utils/AsyncStorageService';
import {AsyncStorageKey} from '../constants/asyncStorageKey';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {isEmptyObject} from '../utils/isEmptyObject';

function useAuthStorage() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const setAuthData = useCallback(
    async (newAccessToken: string, newRefreshToken: string) => {
      try {
        await AsyncStorageService.multiSet([
          {key: AsyncStorageKey.accessToken, value: newAccessToken},
          {key: AsyncStorageKey.refreshToken, value: newRefreshToken},
        ]);
      } catch (error) {
        console.log('토큰 저장 실패:', error);
      }
    },
    [],
  );

  const getAuthData = useCallback(async (): Promise<
    Record<string, string | null>
  > => {
    try {
      return await AsyncStorageService.multiGet([
        AsyncStorageKey.accessToken,
        AsyncStorageKey.refreshToken,
      ]);
    } catch (error) {
      console.error('토큰 가져오기 실패:', error);
      return {
        [AsyncStorageKey.accessToken]: null,
        [AsyncStorageKey.refreshToken]: null,
      };
    }
  }, []);

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    if (accessToken !== null) {
      return accessToken;
    }

    try {
      const accessToken: string | null = await AsyncStorageService.getItem(
        AsyncStorageKey.accessToken,
      );
      return accessToken;
    } catch (error) {
      console.error('액세스 토큰 가져오기 실패:', error);
      return null;
    }
  }, [accessToken]);

  const getRefreshToken = useCallback(async (): Promise<string | null> => {
    if (refreshToken !== null) {
      return refreshToken;
    }

    try {
      const refreshToken: string | null = await AsyncStorageService.getItem(
        AsyncStorageKey.refreshToken,
      );
      return refreshToken;
    } catch (error) {
      console.error('리프레시 토큰 가져오기 실패:', error);
      return null;
    }
  }, [refreshToken]);

  const clearAuthData = useCallback(async () => {
    try {
      await AsyncStorageService.multiSet([
        {key: AsyncStorageKey.accessToken, value: null},
        {key: AsyncStorageKey.refreshToken, value: null},
      ]);

      setAccessToken(null);
      setRefreshToken(null);
    } catch (error) {
      console.error('토큰 삭제 실패:', error);
    }
  }, []);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const tokens = await getAuthData();

        if (!isEmptyObject(tokens)) {
          const accessToken = tokens[AsyncStorageKey.accessToken] || null;
          const refreshToken = tokens[AsyncStorageKey.refreshToken] || null;

          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
        }
      } catch (error) {
        console.error('토큰 로드 실패:', error);
      }
    };

    loadTokens();
  }, [getAuthData]);

  return useMemo(
    () => ({
      setAuthData,
      getAuthData,
      getAccessToken,
      getRefreshToken,
      clearAuthData,
      accessToken,
      refreshToken,
    }),
    [
      accessToken,
      clearAuthData,
      getAccessToken,
      getAuthData,
      getRefreshToken,
      refreshToken,
      setAuthData,
    ],
  );
}

export default useAuthStorage;
