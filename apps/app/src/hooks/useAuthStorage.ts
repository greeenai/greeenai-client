import AsyncStorageService from '../utils/AsyncStorageService';
import {AsyncStorageKey} from '../constants/asyncStorageKey';

function useAuthStorage() {
  const setAuthData = async (accessToken: string, refreshToken: string) => {
    await AsyncStorageService.multiSet([
      {key: AsyncStorageKey.accessToken, value: accessToken},
      {key: AsyncStorageKey.refreshToken, value: refreshToken},
    ]);
  };

  const getAuthData = async () => {
    return await AsyncStorageService.multiGet([
      AsyncStorageKey.accessToken,
      AsyncStorageKey.refreshToken,
    ]);
  };

  const getAccessToken = async () => {
    return await AsyncStorageService.getItem(AsyncStorageKey.accessToken);
  };

  const getRefreshToken = async () => {
    return await AsyncStorageService.getItem(AsyncStorageKey.refreshToken);
  };

  const clearAuthData = async () => {
    await AsyncStorageService.multiSet([
      {key: AsyncStorageKey.accessToken, value: null},
      {key: AsyncStorageKey.refreshToken, value: null},
    ]);
  };

  return {
    setAuthData,
    getAuthData,
    getAccessToken,
    getRefreshToken,
    clearAuthData,
  };
}

export default useAuthStorage;
