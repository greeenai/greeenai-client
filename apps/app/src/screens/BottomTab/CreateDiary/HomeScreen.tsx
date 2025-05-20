import {Image, StyleSheet, View} from 'react-native';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Typography from '../../../components/@common/Typography';
import Button from '../../../components/@common/Button';
import useNavigator from '../../../hooks/useNavigator';

function CreateDiaryScreen() {
  const {createDiaryStackNavigation} = useNavigator();

  const handlePressSelectImage = () => {
    createDiaryStackNavigation.navigate('SelectPhoto');
  };

  const carouselImages = [
    require('../../../assets/images/carousel-image-1.png'),
    require('../../../assets/images/carousel-image-2.png'),
    require('../../../assets/images/carousel-image-3.png'),
  ];

  return (
    <ScreenLayout>
      <View style={createDiaryScreenStyle.carouselContainer}>
        <View
          style={[
            createDiaryScreenStyle.backgroundImage,
            createDiaryScreenStyle.leftBackground,
          ]}>
          <Image
            source={carouselImages[0]}
            style={createDiaryScreenStyle.imageStyle}
            resizeMode="cover"
          />
        </View>

        <View
          style={[
            createDiaryScreenStyle.backgroundImage,
            createDiaryScreenStyle.rightBackground,
          ]}>
          <Image
            source={carouselImages[1]}
            style={createDiaryScreenStyle.imageStyle}
            resizeMode="cover"
          />
        </View>

        <View style={createDiaryScreenStyle.mainImageContainer}>
          <Image
            source={carouselImages[2]}
            style={createDiaryScreenStyle.imageStyle}
            resizeMode="cover"
          />
        </View>
      </View>
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
  carouselContainer: {
    width: '100%',
    height: 380,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  backgroundImage: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 30,
    overflow: 'hidden',
    opacity: 0.7,
  },
  leftBackground: {
    left: -30,
    top: 50,
    transform: [{rotate: '-10deg'}],
    zIndex: 1,
  },
  rightBackground: {
    right: -30,
    top: 50,
    transform: [{rotate: '10deg'}],
    zIndex: 1,
  },
  mainImageContainer: {
    width: 200,
    height: 200,
    borderRadius: 30,
    overflow: 'hidden',
    zIndex: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  avatarContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8A6FDF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
