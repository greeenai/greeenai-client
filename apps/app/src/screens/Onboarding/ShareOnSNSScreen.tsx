import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Button from '../../components/@common/Button';
import Typography from '../../components/@common/Typography';

export type ShareOnSNSScreenProps = {onNext: () => void};

function ShareOnSNSScreen({onNext}: ShareOnSNSScreenProps) {
  return (
    <ScreenLayout>
      <View style={shareOnSNSScreenStyle.content}>
        <Typography type={'headline-20'} style={shareOnSNSScreenStyle.mainText}>
          {'지난 일기도\n다시 볼 수 있어요'}
        </Typography>
        <Typography>
          {'사진만으로 읽기 어려운 이야기를 \n객관식으로 답해보아요'}
        </Typography>
      </View>
      <View style={shareOnSNSScreenStyle.bottomButtonContainer}>
        <Button onPress={onNext}>다음</Button>
      </View>
    </ScreenLayout>
  );
}

export default ShareOnSNSScreen;

const shareOnSNSScreenStyle = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    paddingVertical: 120,
    paddingHorizontal: 40,
  },
  mainText: {
    marginBottom: 15,
  },
  bottomButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
});
