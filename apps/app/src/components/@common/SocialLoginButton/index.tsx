import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Typography from '../Typography';
import Icon from '../Icon';
import {theme} from '@greeenai/design-tokens';
import {ForwardedRef, forwardRef} from 'react';

type SocialLoginButtonVariant = 'kakao' | 'apple';

type SocialLoginButtonProps = {
  variant: SocialLoginButtonVariant;
  onPress: () => void;
  isVisible?: boolean;
};

const label: Record<SocialLoginButtonVariant, string> = {
  kakao: '카카오 로그인',
  apple: 'Apple로 로그인',
};

const getButtonStyle = (variant: SocialLoginButtonVariant) => ({
  backgroundColor: variant === 'kakao' ? '#FEE500' : '#FFFFFF',
  borderWidth: variant === 'apple' ? 1 : 0,
  borderColor: variant === 'apple' ? theme.palette.gray : 'transparent',
});

const getIconSize = (variant: SocialLoginButtonVariant) =>
  variant === 'apple' ? 24 : 32;

function SocialLoginButton(
  {variant, onPress, isVisible = true}: SocialLoginButtonProps,
  ref: ForwardedRef<View>,
) {
  if (!isVisible) return null;

  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      style={[socialLoginButtonStyle.container, getButtonStyle(variant)]}>
      <Icon
        name={variant === 'kakao' ? 'KakaoLogo' : 'AppleLogo'}
        width={getIconSize(variant)}
        style={socialLoginButtonStyle.logo}
      />
      <Typography type={'button-16'}>{label[variant]}</Typography>
    </TouchableOpacity>
  );
}

export default forwardRef(SocialLoginButton);

const socialLoginButtonStyle = StyleSheet.create({
  container: {
    width: 360,
    height: 49,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  logo: {
    position: 'absolute',
    left: 20,
  },
});
