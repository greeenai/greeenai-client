import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Typography from '../../../components/@common/Typography';
import Button from '../../../components/@common/Button';
import useNavigator from '../../../hooks/useNavigator';

function CreateDiaryScreen() {
  const {createDiaryStackNavigation} = useNavigator();

  const handlePressSelectImage = () => {
    createDiaryStackNavigation.navigate('SelectPhoto');
  };

  return (
    <ScreenLayout>
      <View style={createDiaryScreenStyle.carouselImageContainer} />
      <Typography
        type={'button-14'}
        style={createDiaryScreenStyle.textContainer}>
        {
          '그림일기를 만들려면, \n오늘의 일상이 담긴 사진 3장이 필요해요. \n선택하러 가볼까요?'
        }
      </Typography>
      <Button size={'sm'} variant={'rounded'} onPress={handlePressSelectImage}>
        사진 선택하기
      </Button>
    </ScreenLayout>
  );
}

export default CreateDiaryScreen;

const createDiaryScreenStyle = StyleSheet.create({
  carouselImageContainer: {
    width: '100%',
    height: 400,
    borderWidth: 1,
    marginBottom: 20,
  },
  textContainer: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
