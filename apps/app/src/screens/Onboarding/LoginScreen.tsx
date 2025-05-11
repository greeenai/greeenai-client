import {Platform, StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import SocialLoginButton from '../../components/@common/SocialLoginButton';
import Icon from '../../components/@common/Icon';
import Typography from '../../components/@common/Typography';
import useLogin from '../../hooks/apis/useLogin';

export type LoginScreenProps = {onNext: () => void};

function LoginScreen({onNext}: LoginScreenProps) {
  const {loginWithKakao} = useLogin();

  const handlePressKakaoLoginButton = async () => {
    await loginWithKakao(onNext);
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
