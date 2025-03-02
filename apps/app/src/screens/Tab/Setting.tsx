import ScreenLayout from '../../components/@common/ScreenLayout';
import Typography from '../../components/@common/Typography';
import Divider from '../../components/@common/Divider';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from '../../components/@common/Icon';

function SettingScreen() {
  return (
    <ScreenLayout style={settingScreenStyle.container}>
      <Typography color={'darkGray'} style={settingScreenStyle.categoryText}>
        일반
      </Typography>
      <Divider />
      <TouchableOpacity style={settingScreenStyle.menuItem}>
        <Icon name={'TermsAgreement'} />
        <Typography type={'body-18'}>약관</Typography>
      </TouchableOpacity>
      <Divider style={settingScreenStyle.divider} />
      <Typography color={'darkGray'} style={settingScreenStyle.categoryText}>
        회원 관리
      </Typography>
      <Divider />
      <TouchableOpacity style={settingScreenStyle.menuItem}>
        <Icon name={'LogOut'} />
        <Typography type={'body-18'}>로그아웃</Typography>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={settingScreenStyle.menuItem}>
        <Icon name={'DeleteAccount'} />
        <Typography type={'body-18'}>회원 탈퇴</Typography>
      </TouchableOpacity>
      <Divider />
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
