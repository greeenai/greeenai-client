import {Text} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export type LoginScreenProps = {};

function LoginScreen({}: LoginScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>Login Screen</Text>
    </ScreenLayout>
  );
}

export default LoginScreen;
