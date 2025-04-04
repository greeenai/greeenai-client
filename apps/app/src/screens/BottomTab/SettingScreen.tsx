import {useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Typography from '../../components/@common/Typography';
import Divider from '../../components/@common/Divider';
import Icon from '../../components/@common/Icon';
import {BottomSheetRef} from '../../components/@common/BottomSheet';
import DeleteAccountBottomSheet from '../../components/BottomTab/Setting/DeleteAccountBottomSheet';
import LogoutBottomSheet from '../../components/BottomTab/Setting/LogoutBottomSheet';

function SettingScreen() {
  const logoutBottomSheetRef = useRef<BottomSheetRef>(null);
  const deleteAccountBottomSheetRef = useRef<BottomSheetRef>(null);

  const handlePressLogoutButton = () => {
    logoutBottomSheetRef.current?.present();
  };

  const handlePressDeleteAccountButton = () => {
    deleteAccountBottomSheetRef.current?.present();
  };

  return (
    <ScreenLayout style={settingScreenStyle.container}>
      <Typography color={'darkGray'} style={settingScreenStyle.categoryText}>
        회원 관리
      </Typography>
      <Divider />
      <TouchableOpacity
        onPress={handlePressLogoutButton}
        style={settingScreenStyle.menuItem}>
        <Icon name={'LogOut'} width={24} height={24} />
        <Typography type={'body-16'}>로그아웃</Typography>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity
        onPress={handlePressDeleteAccountButton}
        style={settingScreenStyle.menuItem}>
        <Icon name={'DeleteAccount'} width={24} height={24} />
        <Typography type={'body-16'}>회원 탈퇴</Typography>
      </TouchableOpacity>
      <Divider />
      <LogoutBottomSheet ref={logoutBottomSheetRef} />
      <DeleteAccountBottomSheet ref={deleteAccountBottomSheetRef} />
    </ScreenLayout>
  );
}

export default SettingScreen;

const settingScreenStyle = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  categoryText: {
    marginLeft: 30,
    marginBottom: 10,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    gap: 12,
    width: '100%',
  },
  divider: {
    marginBottom: 40,
  },
});
