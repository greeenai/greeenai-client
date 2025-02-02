import {Text, TouchableOpacity} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export type ChooseAnswerScreenProps = {
  onNext: () => void;
};

function ChooseAnswerScreen({onNext}: ChooseAnswerScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>ChooseAnswer Screen</Text>
      <TouchableOpacity onPress={onNext}>
        <Text>다음</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

export default ChooseAnswerScreen;
