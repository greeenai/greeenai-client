import {ApiResponse} from '../api';
import {fetcherInstance} from '../fetcher';
import {LoginRequestBody} from './index.types';

class MemberApi {
  // 로그인
  static async login<T>(
    requestBody: LoginRequestBody,
  ): Promise<ApiResponse<T>> {
    const response = await fetcherInstance.post('/auth/login', requestBody);
    return response as ApiResponse<T>;
  }

  // 로그아웃
  static async logout() {
    return fetcherInstance.post('/auth/logout');
  }

  // 회원 탈퇴
  static async withdraw() {
    return fetcherInstance.delete('/members/me');
  }
}

export default MemberApi;
