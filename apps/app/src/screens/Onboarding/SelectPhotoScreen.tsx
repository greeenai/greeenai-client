import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Button from '../../components/@common/Button';
import Typography from '../../components/@common/Typography';

export type SelectPhotoScreenProps = {
  onNext: () => void;
};

function SelectPhotoScreen({onNext}: SelectPhotoScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <View style={selectPhotoScreenStyle.content}>
        <Typography
          type={'headline-20'}
          style={selectPhotoScreenStyle.mainText}>
          {'사진 3장이면 \n충분해요'}
        </Typography>
        <Typography>
          {'사진만으로 읽기 어려운 이야기를 \n객관식으로 답해보아요'}
        </Typography>
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
    borderWidth: 1,
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  mainText: {
    marginBottom: 15,
  },
  bottomButtonContainer: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
});
