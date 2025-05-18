import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from '../../constants/asyncStorageKey';

class AsyncStorageService {
  static async setItem<T>(key: AsyncStorageKey, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(`Error saving data [${key}]: `, error);
    }
  }

  static async multiSet<T>(
    keyValuePairs: {key: AsyncStorageKey; value: T}[],
  ): Promise<void> {
    try {
      const formattedPairs: [string, string][] = keyValuePairs.map(
        ({key, value}) => [key, JSON.stringify(value)],
      );
      await AsyncStorage.multiSet(formattedPairs);
    } catch (error) {
      console.error(`Error saving multiple data: `, error);
    }
  }

  static async getItem<T>(key: AsyncStorageKey): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.log(`Error loading data [${key}]: `, error);
      return null;
    }
  }

  static async multiGet<T>(
    keys: AsyncStorageKey[],
  ): Promise<Record<string, T | null>> {
    try {
      const values = await AsyncStorage.multiGet(keys);

      return values.reduce((acc, [key, value]) => {
        acc[key] = value ? JSON.parse(value) : null;
        return acc;
      }, {} as Record<string, T | null>);
    } catch (error) {
      console.error(`Error loading multiple data: `, error);
      return {};
    }
  }

  static async removeItem(key: AsyncStorageKey): Promise<void> {
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
