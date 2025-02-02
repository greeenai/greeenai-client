import {Text, TouchableOpacity} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export type ShareOnSNSScreenProps = {onNext: () => void};

function ShareOnSNSScreen({onNext}: ShareOnSNSScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>ShareOnSNS Screen</Text>
      <TouchableOpacity onPress={onNext}>
        <Text>다음</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

export default ShareOnSNSScreen;
