import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import SocialLoginButton from '../../components/@common/SocialLoginButton';

export type LoginScreenProps = {onNext: () => void};

function LoginScreen({onNext}: LoginScreenProps) {
  return (
    <ScreenLayout isSafeArea style={loginScreenStyle.base}>
      <View style={loginScreenStyle.logoContainer} />
      <View style={loginScreenStyle.socialLoginButtonContainer}>
        <SocialLoginButton variant={'kakao'} />
        <SocialLoginButton variant={'apple'} />
      </View>
    </ScreenLayout>
  );
}

export default LoginScreen;

const loginScreenStyle = StyleSheet.create({
  base: {
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
  },
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
