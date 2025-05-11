import {Alert} from 'react-native';
import kakaoClient from '../../apis/kakaoClient';
import MemberApi from '../../apis/member';
import useAuthStorage from '../useAuthStorage';

type OnSuccessCallback = (...args: any) => void;

function useAuth() {
  const {setAuthData} = useAuthStorage();

  const loginWithKakao = async (onSuccess: OnSuccessCallback) => {
    try {
      await kakaoClient.loginWithKakaoAccount();
      const {
        nickname: name,
        email,
        id: oauthId,
      } = await kakaoClient.getProfile();

      const userData: LoginRequestBody = {
        name,
        email,
        oauthId: oauthId.toString(),
        oauthProvider: 'kakao',
      };

      const response = await MemberApi.login<LoginResponseDto>(userData);

      if (response.status === 200) {
        const {accessToken, refreshToken} = response.data;
        setAuthData(accessToken, refreshToken);
        onSuccess();
        return;
      }
    } catch (error) {
      console.error('Kakao login error:', error);
      Alert.alert(
        '알림',
        '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  const loginWithApple = () => {
    try {
    } catch (error) {
      console.error('Apple login error:', error);
      Alert.alert(
        '알림',
        '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  const logout = async () => {
    try {
      await MemberApi.logout();
    } catch (error) {
      console.error('logout error:', error);
      Alert.alert(
        '알림',
        '로그아웃 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  const withdraw = async () => {
    try {
      await MemberApi.withdraw();
    } catch (error) {
      console.error('logout error:', error);
      Alert.alert(
        '알림',
        '탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  return {
    loginWithKakao,
    loginWithApple,
    logout,
    withdraw,
  };
}

export default useAuth;
