import AsyncStorageService from '../utils/AsyncStorageService';
import {AsyncStorageKey} from '../constants/asyncStorageKey';
import {useCallback, useMemo} from 'react';

function useAuthStorage() {
  const setToken = useCallback(
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

  const getToken = useCallback(async (): Promise<
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
    try {
      const accessToken: string | null = await AsyncStorageService.getItem(
        AsyncStorageKey.accessToken,
      );
      return accessToken;
    } catch (error) {
      console.error('액세스 토큰 가져오기 실패:', error);
      return null;
    }
  }, []);

  const getRefreshToken = useCallback(async (): Promise<string | null> => {
    try {
      const refreshToken: string | null = await AsyncStorageService.getItem(
        AsyncStorageKey.refreshToken,
      );
      return refreshToken;
    } catch (error) {
      console.error('리프레시 토큰 가져오기 실패:', error);
      return null;
    }
  }, []);

  const clearToken = useCallback(async () => {
    try {
      await AsyncStorageService.multiSet([
        {key: AsyncStorageKey.accessToken, value: null},
        {key: AsyncStorageKey.refreshToken, value: null},
      ]);
    } catch (error) {
      console.error('토큰 삭제 실패:', error);
    }
  }, []);

  return useMemo(
    () => ({
      setToken,
      getToken,
      getAccessToken,
      getRefreshToken,
      clearToken,
    }),
    [clearToken, getAccessToken, getToken, getRefreshToken, setToken],
  );
}

export default useAuthStorage;
