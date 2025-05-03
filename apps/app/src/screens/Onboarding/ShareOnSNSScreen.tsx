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
          {'소중한 순간을\n친구들에게 공유해봐요'}
        </Typography>
        <Typography>
          {'완성된 일기를 SNS에 올려\n친구들과 추억을 나눠보세요'}
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
