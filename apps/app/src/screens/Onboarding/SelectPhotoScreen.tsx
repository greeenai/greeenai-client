import {Text} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export type SelectPhotoScreenProps = {};

function SelectPhotoScreen({}: SelectPhotoScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>SelectPhoto Screen</Text>
    </ScreenLayout>
  );
}

export default SelectPhotoScreen;
