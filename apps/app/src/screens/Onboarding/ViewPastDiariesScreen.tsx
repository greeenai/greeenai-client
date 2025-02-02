import {Text} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export type ViewPastDiariesScreenProps = {};

function ViewPastDiariesScreen({}: ViewPastDiariesScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>ViewPastDiaries Screen</Text>
    </ScreenLayout>
  );
}

export default ViewPastDiariesScreen;
