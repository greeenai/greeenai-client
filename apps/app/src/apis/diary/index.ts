import {ApiResponse} from '../api';
import {fetcherInstance} from '../fetcher';
import {
  DiaryQuestionAnswerRequestBody,
  DiaryQuestionAnswersResponseDto,
  DiaryQuestionRequestBody,
  DiaryQuestionResponseDto,
  LastDiariesResponse,
} from './index.types';

class DiaryApi {
  // 지난 일기 리스트 조회
  static async getLastDiaries() {
    const response = await fetcherInstance.get('/diaries');
    return response as ApiResponse<LastDiariesResponse>;
  }

  // 일기 질문 리스트 조회
  static async getDiaryQuestions(requestBody: DiaryQuestionRequestBody) {
    const response = await fetcherInstance.post('/diaries', requestBody);
    return response as ApiResponse<DiaryQuestionResponseDto>;
  }

  // 일기 질문 답변
  static async putDiaryQuestionAnswers(
    diaryId: number,
    requestBody: DiaryQuestionAnswerRequestBody,
  ) {
    const response = await fetcherInstance.put(
      `/diaries/${diaryId}/generate-image`,
      requestBody,
    );
    return response as ApiResponse<DiaryQuestionAnswersResponseDto>;
  }
}

export default DiaryApi;
