import {StyleSheet} from 'react-native';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Typography from '../../../components/@common/Typography';

function RequiredTermsScreen() {
  return (
    <ScreenLayout style={requiredTermsScreenStyle.base}>
      <Typography type={'body-14'}>
        {
          '제1조 (목적)\n 본 약관은 [그리내] (이하 "서비스")의 이용과 관련하여 서비스 제공자와 이용자(이하 "회원") 간의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.\n\n 제2조 (용어의 정의)\n 1. "서비스"란, 회원이 업로드한 사진을 기반으로 그림일기를 생성하여 제공하는 기능을 포함하는 [서비스명]의 플랫폼을 의미합니다.\n 2. "회원"이란, 본 약관에 동의하고 서비스에 가입하여 이용하는 개인을 의미합니다. \n 3. "콘텐츠"란, 회원이 업로드한 사진, 생성된 그림일기 및 기타 제공되는 모든 자료를 의미합니다. \n\n제3조 (약관의 효력 및 변경)\n 1. 본 약관은 서비스 회원가입 시 동의 절차를 거침으로써 효력이 발생합니다. \n 2. 서비스 제공자는 관련 법령을 준수하는 범위 내에서 본 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 사전 공지합니다. \n\n제4조 (회원가입 및 계정 관리)\n 1. 회원가입은 본 약관에 동의한 후, 서비스에서 요구하는 필수 정보를 제공하여 완료됩니다. \n 2. 회원은 정확하고 최신의 정보를 제공해야 하며, 부정확한 정보로 인해 발생하는 불이익에 대해 서비스 제공자는 책임지지 않습니다. \n 3. 회원은 본인의 계정을 보호할 책임이 있으며, 계정의 부정 사용이 발생한 경우 즉시 서비스 제공자에게 통지해야 합니다.'
        }
      </Typography>
    </ScreenLayout>
  );
}

export default RequiredTermsScreen;

const requiredTermsScreenStyle = StyleSheet.create({
  base: {
    padding: 30,
  },
});
