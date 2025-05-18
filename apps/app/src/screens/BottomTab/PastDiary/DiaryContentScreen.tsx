import {useLayoutEffect, useRef} from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Share, {Social} from 'react-native-share';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {captureRef} from 'react-native-view-shot';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import {PastDiaryStackNavigatorParamList} from '../../../types/navigators';
import {formatDateToYYMMDD} from '../../../utils/common/formatDate';
import Typography from '../../../components/@common/Typography';
import Button from '../../../components/@common/Button';
import Icon from '../../../components/@common/Icon';
import {palette} from '../../../../../../packages/design-tokens/src/palette';

function DiaryContentScreen() {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<PastDiaryStackNavigatorParamList, 'DiaryContent'>>();
  const scrollViewRef = useRef(null);
  const contentRef = useRef(null);

  const {entryDate, content, imageUrl} = route.params;
  const formattedContent = content.replace(/([.!?])\s*/g, '$1\n');

  const captureDiaryContent = async () => {
    try {
      if (scrollViewRef.current) {
        const uri = await captureRef(scrollViewRef, {
          format: 'jpg',
          quality: 0.9,
          result: 'tmpfile',
          snapshotContentContainer: true,
        });

        return uri;
      }

      return '';
    } catch (error) {
      console.error('이미지 캡처 실패:', error);
      Alert.alert('캡처 실패', '이미지를 캡처하는데 실패했습니다.');
      return '';
    }
  };

  const handlePressSaveDiaryImage = async () => {
    try {
      const uri = await captureDiaryContent();
      await CameraRoll.saveAsset(uri, {type: 'photo'});
      Alert.alert('저장 완료', '이미지가 갤러리에 저장되었습니다.');
    } catch (error) {
      console.error('이미지 저장 실패:', error);
      Alert.alert('저장 실패', '이미지를 갤러리에 저장하는데 실패했습니다.');
    }
  };

  const handlePressShareToInstagram = async () => {
    const uri = await captureDiaryContent();

    if (Platform.OS === 'ios') {
      const shareOptions = {
        url: uri,
        social: Social.InstagramStories,
        appId: '123456789',
        backgroundImage: uri,
        backgroundTopColor: palette.white,
        backgroundBottomColor: palette.white,
      };

      await Share.shareSingle(shareOptions);
      return;
    }

    const fileUrl = `file://${uri}`;
    const instagramURL = `instagram://library?AssetPath=${fileUrl}`;

    const canOpenURL = await Linking.canOpenURL(instagramURL);

    if (canOpenURL) {
      await Linking.openURL(instagramURL);
    } else {
      Alert.alert(
        '인스타그램 앱을 찾을 수 없어요.',
        '인스타그램 앱이 설치되어 있는지 확인해주세요.',
      );
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${formatDateToYYMMDD(entryDate)}`,
    });
  }, [navigation, entryDate]);

  return (
    <ScreenLayout>
      <ScrollView ref={scrollViewRef} collapsable={false}>
        <View collapsable={false} ref={contentRef}>
          <View style={diaryContentScreenStyle.imageContainer}>
            <Image
              source={{uri: imageUrl}}
              style={diaryContentScreenStyle.image}
            />
          </View>
          <View style={diaryContentScreenStyle.contentContainer}>
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
          leftElement={<Icon name={'ShareOnSNS'} width={16} height={16} />}
          size={'sm'}
          backgroundColor="white"
          onPress={handlePressShareToInstagram}>
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
