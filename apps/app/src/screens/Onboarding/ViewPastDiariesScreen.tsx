import {Text, TouchableOpacity} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export type ViewPastDiariesScreenProps = {
  onNext: () => void;
};

function ViewPastDiariesScreen({onNext}: ViewPastDiariesScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>ViewPastDiaries Screen</Text>
      <TouchableOpacity onPress={onNext}>
        <Text>다음</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

export default ViewPastDiariesScreen;
