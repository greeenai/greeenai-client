import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Typography from '../../../components/@common/Typography';
import {CreateDiaryStackNavigatorParamList} from '../../../types/navigators';
import Button from '../../../components/@common/Button';
import useNavigator from '../../../hooks/useNavigator';
import {useRef, useState} from 'react';
import {screenWidth} from '../../../constants/screenDimensions';

type ConfirmPhotoRouteProp = RouteProp<
  CreateDiaryStackNavigatorParamList,
  'ConfirmPhoto'
>;

function ConfirmPhotoScreen() {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  const {createDiaryStackNavigation} = useNavigator();
  const route = useRoute<ConfirmPhotoRouteProp>();

  const selectedPhotos = route.params?.selectedPhotos || [];

  const handlePressNextButton = () => {
    createDiaryStackNavigation.navigate('SelectEmotion');
  };

  const renderItem = ({item}: {item: string}) => {
    return (
      <View style={confirmPhotoScreenStyle.slide}>
        <Image
          source={{uri: item}}
          style={confirmPhotoScreenStyle.image}
          resizeMode="stretch"
        />
      </View>
    );
  };

  const handleSnapCarouselItem = (index: number) => setActiveSlide(index);

  const handlePressCarouselDot = (index: number) => {
    if (!carouselRef.current) {
      return;
    }

    carouselRef.current.scrollTo({index});
  };

  return (
    <ScreenLayout>
      <View style={confirmPhotoScreenStyle.imageContainer}>
        <View style={confirmPhotoScreenStyle.imageCarouselContainer}>
          <Carousel
            ref={carouselRef}
            data={selectedPhotos}
            renderItem={renderItem}
            width={screenWidth}
            height={screenWidth}
            onScrollEnd={handleSnapCarouselItem}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.9,
              parallaxScrollingOffset: 40,
            }}
            loop={false}
            autoPlay={false}
            scrollAnimationDuration={500}
            style={confirmPhotoScreenStyle.imageCarousel}
            defaultIndex={activeSlide}
          />
          <View style={confirmPhotoScreenStyle.paginationContainer}>
            {selectedPhotos.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  confirmPhotoScreenStyle.dot,
                  {
                    backgroundColor:
                      activeSlide === index ? '#3498db' : '#e0e0e0',
                  },
                ]}
                onPress={() => handlePressCarouselDot(index)}
              />
            ))}
          </View>
        </View>
        <View style={confirmPhotoScreenStyle.tipTextContainer}>
          <Typography
            type={'button-14'}
            style={confirmPhotoScreenStyle.tipText}>
            {
              '🍯 사진 고르는 꿀팁\n객체가 들어간 사진이면 더 좋아요!\n인식 가능한 사진이었으면 좋겠어요!'
            }
          </Typography>
        </View>
      </View>
      <Button
        onPress={handlePressNextButton}
        style={confirmPhotoScreenStyle.button}>
        다음
      </Button>
    </ScreenLayout>
  );
}

export default ConfirmPhotoScreen;

const confirmPhotoScreenStyle = StyleSheet.create({
  imageContainer: {
    width: '100%',
    flex: 1,
    paddingBottom: 50,
  },
  imageCarouselContainer: {
    width: '100%',
    flex: 1,
    paddingVertical: 50,
  },
  slide: {
    width: screenWidth - 30,
    height: screenWidth - 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
  imageCarousel: {
    width: '100%',
    alignSelf: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginHorizontal: 3,
  },
  tipTextContainer: {
    paddingVertical: 15,
  },
  tipText: {
    textAlign: 'center',
  },
  button: {
    marginBottom: 10,
  },
});
