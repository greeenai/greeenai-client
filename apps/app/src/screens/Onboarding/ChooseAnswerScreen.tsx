import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Button from '../../components/@common/Button';
import Typography from '../../components/@common/Typography';

export type ChooseAnswerScreenProps = {
  onNext: () => void;
};

function ChooseAnswerScreen({onNext}: ChooseAnswerScreenProps) {
  return (
    <ScreenLayout>
      <View style={chooseAnswerScreenStyle.content}>
        <Typography
          type={'headline-20'}
          style={chooseAnswerScreenStyle.mainText}>
          {'당신의 하루를\n자세히 들려주세요'}
        </Typography>
        <Typography>
          {'사진만으로 읽기 어려운 이야기를 \n객관식으로 답해보아요'}
        </Typography>
      </View>
      <View style={chooseAnswerScreenStyle.bottomButtonContainer}>
        <Button onPress={onNext}>다음</Button>
      </View>
    </ScreenLayout>
  );
}

export default ChooseAnswerScreen;

const chooseAnswerScreenStyle = StyleSheet.create({
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
