import {Text, TouchableOpacity} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';

export type LoginScreenProps = {onNext: () => void};

function LoginScreen({onNext}: LoginScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>Login Screen</Text>
      <TouchableOpacity onPress={onNext}>
        <Text>다음</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

export default LoginScreen;
