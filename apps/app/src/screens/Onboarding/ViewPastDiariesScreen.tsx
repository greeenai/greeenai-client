import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Button from '../../components/@common/Button';
import Typography from '../../components/@common/Typography';

export type ViewPastDiariesScreenProps = {
  onNext: () => void;
};

function ViewPastDiariesScreen({onNext}: ViewPastDiariesScreenProps) {
  return (
    <ScreenLayout>
      <View style={viewPastDiariesScreenStyle.content}>
        <Typography
          type={'headline-20'}
          style={viewPastDiariesScreenStyle.mainText}>
          {'지난 일기도\n다시 볼 수 있어요'}
        </Typography>
        <Typography>{'언제든지 과거의 추억을\n되돌아볼 수 있어요'}</Typography>
      </View>
      <View style={viewPastDiariesScreenStyle.bottomButtonContainer}>
        <Button onPress={onNext}>다음</Button>
      </View>
    </ScreenLayout>
  );
}

export default ViewPastDiariesScreen;

const viewPastDiariesScreenStyle = StyleSheet.create({
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
