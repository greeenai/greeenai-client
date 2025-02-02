import {Text, TouchableOpacity} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export type SelectPhotoScreenProps = {
  onNext: () => void;
};

function SelectPhotoScreen({onNext}: SelectPhotoScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>SelectPhoto Screen</Text>
      <TouchableOpacity onPress={onNext}>
        <Text>다음</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

export default SelectPhotoScreen;
