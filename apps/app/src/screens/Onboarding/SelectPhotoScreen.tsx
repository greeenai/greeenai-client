import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Button from '../../components/@common/Button';

export type SelectPhotoScreenProps = {
  onNext: () => void;
};

function SelectPhotoScreen({onNext}: SelectPhotoScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <View style={selectPhotoScreenStyle.content} />
      <View style={selectPhotoScreenStyle.bottomButtonContainer}>
        <Button onPress={onNext}>다음</Button>
      </View>
    </ScreenLayout>
  );
}

export default SelectPhotoScreen;

const selectPhotoScreenStyle = StyleSheet.create({
  content: {
    flex: 1,
  },
  bottomButtonContainer: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
});
