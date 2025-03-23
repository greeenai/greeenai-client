import {Image, ScrollView, StyleSheet, View} from 'react-native';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useLayoutEffect} from 'react';
import {PastDiaryStackNavigatorParamList} from '../../../types/navigators';
import {formatDateToYYMMDD} from '../../../utils/formatDate';
import {mockDiaryContent} from '../../../constants/mockDatas/diaryContent';
import Typography from '../../../components/@common/Typography';
import Button from '../../../components/@common/Button';
import Icon from '../../../components/@common/Icon';

function DiaryContentScreen() {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<PastDiaryStackNavigatorParamList, 'DiaryContent'>>();

  const createdAt = route.params.createdAt;
  const formattedContent = mockDiaryContent.content.replace(
    /([.!?])\s*/g,
    '$1\n',
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${formatDateToYYMMDD(createdAt)}`,
    });
  }, [navigation, createdAt]);

  return (
    <ScreenLayout>
      <ScrollView>
        <View style={diaryContentScreenStyle.imageContainer}>
          <Image
            source={{uri: mockDiaryContent.imageUrl}}
            style={diaryContentScreenStyle.image}
          />
        </View>
        <View style={diaryContentScreenStyle.contentContainer}>
          <Typography type={'headline-20'}>{mockDiaryContent.title}</Typography>
          <Typography type={'body-12'}>{formattedContent}</Typography>
        </View>
        <View style={diaryContentScreenStyle.buttonContainer}>
          <Button
            leftElement={<Icon name={'SaveInGallery'} width={20} height={20} />}
            size={'sm'}
            onPress={() => {}}>
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
      </ScrollView>
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
    paddingBottom: 15,
  },
});
