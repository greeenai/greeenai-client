import {fetcherInstance} from '../fetcher';

class MemberApi {
  // 로그인
  static async login(requestBody: LoginRequestBody) {
    return fetcherInstance.post('/login', requestBody);
  }

  // 로그아웃
  static async logout() {
    return fetcherInstance.post('/logout');
  }
}

export default MemberApi;
