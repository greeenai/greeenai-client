import {ApiResponse} from '../api';
import {fetcherInstance} from '../fetcher';
import {LastDiariesResponse} from './index.types';

class DiaryApi {
  static async getLastDiaries() {
    const response = await fetcherInstance.get('/diaries');
    return response as ApiResponse<LastDiariesResponse>;
  }
}

export default DiaryApi;
