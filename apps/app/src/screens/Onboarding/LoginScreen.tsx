import {Alert, Platform, StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import SocialLoginButton from '../../components/@common/SocialLoginButton';
import useAuthStorage from '../../hooks/useAuthStorage';
import kakaoClient from '../../apis/kakaoClient';
import Icon from '../../components/@common/Icon';
import Typography from '../../components/@common/Typography';
import MemberApi from '../../apis/member';

export type LoginScreenProps = {onNext: () => void};

function LoginScreen({onNext}: LoginScreenProps) {
  const {setAuthData} = useAuthStorage();

  const handlePressKakaoLoginButton = async () => {
    await kakaoClient.loginWithKakaoAccount();
    const {nickname: name, email, id: oauthId} = await kakaoClient.getProfile();

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
      onNext();
      return;
    }

    Alert.alert('알림', '로그인 실패하였습니다. 잠시 후 다시 시도해주세요.');
  };

  const handlePressAppleLoginButton = () => {};

  return (
    <ScreenLayout isSafeArea>
      <View style={loginScreenStyle.logoContainer}>
        <Icon name={'Logo'} width={100} height={110} />
        <Typography type={'body-16'}>사진 3장으로 하루를 기록하다</Typography>
      </View>
      <View style={loginScreenStyle.socialLoginButtonContainer}>
        <SocialLoginButton
          variant={'kakao'}
          onPress={handlePressKakaoLoginButton}
        />
        <SocialLoginButton
          variant={'apple'}
          onPress={handlePressAppleLoginButton}
          isVisible={Platform.OS === 'ios'}
        />
      </View>
    </ScreenLayout>
  );
}

export default LoginScreen;

const loginScreenStyle = StyleSheet.create({
  logoContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 35,
  },
  socialLoginButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});
