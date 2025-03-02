import {
  getProfile,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';

const kakaoClient = {
  loginWithKakaoAccount: async () => {
    return await loginWithKakaoAccount();
  },
  getProfile: async () => {
    return await getProfile();
  },
};

export default kakaoClient;
