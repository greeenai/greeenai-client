import AsyncStorage from '@react-native-async-storage/async-storage';

type KeyOfAsyncStorageService = 'accessToken';

class AsyncStorageService {
  static async setItem<T>(
    key: KeyOfAsyncStorageService,
    value: T,
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(`Error saving data [${key}]: `, error);
    }
  }

  static async getItem<T>(key: KeyOfAsyncStorageService): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.log(`Error loading data [${key}]: `, error);
      return null;
    }
  }

  static async removeItem(key: KeyOfAsyncStorageService): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(`Error removing data [${key}]: `, error);
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(`Error clearing AsyncStorage: `, error);
    }
  }
}

export default AsyncStorageService;
