import {Text} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export type ShareOnSNSScreenProps = {};

function ShareOnSNSScreen({}: ShareOnSNSScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>ShareOnSNS Screen</Text>
    </ScreenLayout>
  );
}

export default ShareOnSNSScreen;
