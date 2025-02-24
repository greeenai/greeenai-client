import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import SocialLoginButton from '../../components/@common/SocialLoginButton';
import {
  loginWithKakaoAccount,
  getProfile,
} from '@react-native-seoul/kakao-login';
import useAuthStorage from '../../hooks/useAuthStorage';

export type LoginScreenProps = {onNext: () => void};

function LoginScreen({onNext}: LoginScreenProps) {
  const {setAuthData} = useAuthStorage();

  const handlePressKakaoLoginButton = async () => {
    const {accessToken, refreshToken} = await loginWithKakaoAccount();
    const {
      nickname: username,
      email: userEmail,
      id: oauthId,
    } = await getProfile();

    const userData = {
      username,
      userEmail,
      oauthId,
      oauthProvider: 'KAKAO',
    };

    console.log(userData);

    // TODO: API 연결

    setAuthData(accessToken, refreshToken);
    onNext();
  };

  const handlePressAppleLoginButton = () => {};

  return (
    <ScreenLayout isSafeArea>
      <View style={loginScreenStyle.logoContainer} />
      <View style={loginScreenStyle.socialLoginButtonContainer}>
        <SocialLoginButton
          variant={'kakao'}
          onPress={handlePressKakaoLoginButton}
        />
        <SocialLoginButton
          variant={'apple'}
          onPress={handlePressAppleLoginButton}
        />
      </View>
    </ScreenLayout>
  );
}

export default LoginScreen;

const loginScreenStyle = StyleSheet.create({
  logoContainer: {
    flex: 1,
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
  },
  socialLoginButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});
