import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Button from '../../components/@common/Button';
import Typography from '../../components/@common/Typography';

export type SelectPhotoScreenProps = {
  onNext: () => void;
};

function SelectPhotoScreen({onNext}: SelectPhotoScreenProps) {
  return (
    <ScreenLayout>
      <View style={selectPhotoScreenStyle.content}>
        <Typography
          type={'headline-20'}
          style={selectPhotoScreenStyle.mainText}>
          {'사진 3장이면 \n충분해요'}
        </Typography>
        <Typography>{'당신의 하루를 보여주는\n사진을 선택해보세요'}</Typography>
      </View>
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
    width: '100%',
    paddingVertical: 120,
    paddingHorizontal: 40,
  },
  mainText: {
    marginBottom: 15,
  },
  bottomButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
});
