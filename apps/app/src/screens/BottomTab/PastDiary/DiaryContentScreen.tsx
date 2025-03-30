import {useLayoutEffect, useRef} from 'react';
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import {PastDiaryStackNavigatorParamList} from '../../../types/navigators';
import {formatDateToYYMMDD} from '../../../utils/formatDate';
import {mockDiaryContent} from '../../../constants/mockDatas/diaryContent';
import Typography from '../../../components/@common/Typography';
import Button from '../../../components/@common/Button';
import Icon from '../../../components/@common/Icon';
import {captureRef} from 'react-native-view-shot';

function DiaryContentScreen() {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<PastDiaryStackNavigatorParamList, 'DiaryContent'>>();
  const scrollViewRef = useRef(null);
  const contentRef = useRef(null);

  const createdAt = route.params.createdAt;
  const formattedContent = mockDiaryContent.content.replace(
    /([.!?])\s*/g,
    '$1\n',
  );

  const handlePressSaveDiaryImage = async () => {
    try {
      if (scrollViewRef.current) {
        const uri = await captureRef(scrollViewRef, {
          format: 'jpg',
          quality: 0.9,
          result: 'tmpfile',
          snapshotContentContainer: true,
        });

        await CameraRoll.saveAsset(uri, {type: 'photo'});
        Alert.alert('저장 완료', '이미지가 갤러리에 저장되었습니다.');
      }
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      Alert.alert('저장 실패', '이미지를 갤러리에 저장하는데 실패했습니다.');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${formatDateToYYMMDD(createdAt)}`,
    });
  }, [navigation, createdAt]);

  return (
    <ScreenLayout>
      <ScrollView ref={scrollViewRef} collapsable={false}>
        <View collapsable={false} ref={contentRef}>
          <View style={diaryContentScreenStyle.imageContainer}>
            <Image
              source={{uri: mockDiaryContent.imageUrl}}
              style={diaryContentScreenStyle.image}
            />
          </View>
          <View style={diaryContentScreenStyle.contentContainer}>
            <Typography type={'headline-20'}>
              {mockDiaryContent.title}
            </Typography>
            <Typography type={'body-12'}>{formattedContent}</Typography>
          </View>
        </View>
      </ScrollView>
      <View style={diaryContentScreenStyle.buttonContainer}>
        <Button
          leftElement={<Icon name={'SaveInGallery'} width={20} height={20} />}
          size={'sm'}
          onPress={handlePressSaveDiaryImage}>
          저장하기
        </Button>
        <Button
          leftElement={<Icon name={'ShareOnSNS'} width={20} height={20} />}
          size={'sm'}
          backgroundColor="white"
          onPress={() => {}}>
          공유하기
        </Button>
      </View>
    </ScreenLayout>
  );
}

export default DiaryContentScreen;

const diaryContentScreenStyle = StyleSheet.create({
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 25,
    width: '100%',
    gap: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    paddingHorizontal: 25,
    paddingTop: 15,
  },
});
