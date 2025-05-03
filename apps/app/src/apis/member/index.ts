import {axiosInstance} from '../axios';

class MemberApi {
  // 로그인
  static login(requestBody: LoginRequestBody) {
    axiosInstance.post('/login', requestBody);
  }
}

export default MemberApi;
