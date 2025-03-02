import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Button from '../../components/@common/Button';

export type ChooseAnswerScreenProps = {
  onNext: () => void;
};

function ChooseAnswerScreen({onNext}: ChooseAnswerScreenProps) {
  return (
    <ScreenLayout>
      <View style={chooseAnswerScreenStyle.content} />
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
  },
  bottomButtonContainer: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
});
