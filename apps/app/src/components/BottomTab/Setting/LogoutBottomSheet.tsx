import React, {ForwardedRef, forwardRef} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import BottomSheet, {BottomSheetRef} from '../../@common/BottomSheet';
import Typography from '../../@common/Typography';
import Button from '../../@common/Button';
import useAuth from '../../../hooks/apis/useAuth';
import useNavigator from '../../../hooks/useNavigator';

type LogoutBottomSheetProps = {};

function LogoutBottomSheet(
  _: LogoutBottomSheetProps,
  ref: ForwardedRef<BottomSheetRef>,
) {
  const {onboardingStackNavigation} = useNavigator();
  const {logout} = useAuth();

  const handleSuccessLogout = () => {
    Alert.alert('알림', '로그아웃 성공하였습니다!');
    onboardingStackNavigation.navigate('LoginScreen');
  };

  const handlePressLogoutButton = async () => {
    await logout(handleSuccessLogout);
  };

  const handlePressCloseBottomSheetButton = () => {
    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.dismiss();
    }
  };

  return (
    <BottomSheet
      ref={ref}
      handleIndicatorStyle={logoutBottomSheetStyle.bottomSheetIndicator}>
      <View style={logoutBottomSheetStyle.bottomSheetViewContainer}>
        <Typography type={'headline-20'}>정말 로그아웃하시겠어요?</Typography>
        <View style={logoutBottomSheetStyle.buttonContainer}>
          <Button width={157} onPress={handlePressLogoutButton}>
            네
          </Button>
          <Button
            width={157}
            onPress={handlePressCloseBottomSheetButton}
            backgroundColor={'white'}>
            아니오
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
}

export default forwardRef(LogoutBottomSheet);

const logoutBottomSheetStyle = StyleSheet.create({
  bottomSheetIndicator: {
    display: 'none',
  },
  bottomSheetViewContainer: {
    height: 170,
    paddingTop: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 50,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});
