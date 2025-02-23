import {StyleSheet} from 'react-native';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Typography from '../../../components/@common/Typography';

function OptionalTermsScreen() {
  return (
    <ScreenLayout style={optionalTermsScreenStyle.container}>
      <Typography type={'body-14'}>
        {
          '제1조 (개인정보의 홍보 목적 활용 동의 - 선택 사항)\n 1. 회원은 본인의 사진 및 생성된 그림일기를 서비스 홍보 목적으로 활용하는 것에 대해 선택적으로 동의할 수 있습니다. \n 2. 동의한 경우, 서비스 제공자는 회원의 콘텐츠를 홍보 자료, 마케팅 콘텐츠, 광고 등에 활용할 수 있으며, 이 과정에서 회원의 개인정보는 익명화 또는 최소화하여 보호됩니다.'
        }
      </Typography>
    </ScreenLayout>
  );
}

export default OptionalTermsScreen;

const optionalTermsScreenStyle = StyleSheet.create({
  container: {
    padding: 30,
  },
});
