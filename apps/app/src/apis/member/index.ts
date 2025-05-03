import {fetcherInstance} from '../fetcher';

class MemberApi {
  // 로그인
  static async login(requestBody: LoginRequestBody) {
    return fetcherInstance.post('/login', requestBody);
  }
}

export default MemberApi;
