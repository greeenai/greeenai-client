import {Text} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export type ChooseAnswerScreenProps = {};

function ChooseAnswerScreen({}: ChooseAnswerScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>ChooseAnswer Screen</Text>
    </ScreenLayout>
  );
}

export default ChooseAnswerScreen;
