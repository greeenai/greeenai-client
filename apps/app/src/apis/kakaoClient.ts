import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login';

const kakaoClient = {
  loginWithKakaoAccount: async (): Promise<KakaoOAuthToken> => {
    return await loginWithKakaoAccount();
  },
  getProfile: async (): Promise<KakaoProfile> => {
    return await getProfile();
  },
};

export default kakaoClient;
