import {useState, useEffect} from 'react';
import {StyleSheet, Animated, View, Alert} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Icon from '../../../components/@common/Icon';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Typography from '../../../components/@common/Typography';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  CreateDiaryStackNavigatorParamList,
  TabNavigatorParamList,
} from '../../../types/navigators';
import DiaryApi from '../../../apis/diary';

type CreatingDiaryScreenRouteProp = RouteProp<
  CreateDiaryStackNavigatorParamList,
  'CreatingDiary'
>;

function CreatingDiaryScreen() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const route = useRoute<CreatingDiaryScreenRouteProp>();

  const {diaryId, diaryQuestionAnswers} = route.params;
  const fadeAnim = useState(new Animated.Value(0))[0];

  const navigation =
    useNavigation<StackNavigationProp<TabNavigatorParamList>>();

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    });

    const sequence = [fadeIn, Animated.delay(2000), fadeOut];

    const timer = setTimeout(() => {
      Animated.sequence(sequence).start(() => {
        setCurrentMessageIndex(
          prevIndex => (prevIndex + 1) % loadingMessages.length,
        );
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [currentMessageIndex, fadeAnim]);

  useEffect(() => {
    const submitAnswers = async () => {
      try {
        const response = await DiaryApi.putDiaryQuestionAnswers(
          diaryId,
          diaryQuestionAnswers,
        );

        if (response.status === 200) {
          const {imageUrl, content, entryDate} = response.data;

          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'PastDiaryStackNavigator',
                params: {
                  screen: 'DiaryContent',
                  params: {
                    id: diaryId,
                    entryDate,
                    content,
                    imageUrl,
                    isPast: false,
                  },
                },
              },
            ],
          });

          Alert.alert('생성 완료', '오늘의 일기가 생성되었습니다.');
        } else {
          Alert.alert('오류', '일기 생성에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        Alert.alert('네트워크 오류', '서버와 연결에 실패했습니다.');
        console.error('putDiaryQuestionAnswers error:', error);
      }
    };

    submitAnswers();
  }, [diaryId, diaryQuestionAnswers, navigation]);

  return (
    <ScreenLayout isSafeArea style={creatingDiaryScreenStyle.container}>
      <View style={creatingDiaryScreenStyle.contentContainer}>
        <Icon name={'Logo'} width={100} height={111} />
        <Animated.View
          style={[
            creatingDiaryScreenStyle.messageContainer,
            {opacity: fadeAnim},
          ]}>
          <Typography
            type={'body-16'}
            style={creatingDiaryScreenStyle.loadingText}>
            {loadingMessages[currentMessageIndex]}
          </Typography>
        </Animated.View>
      </View>
    </ScreenLayout>
  );
}

export default CreatingDiaryScreen;

const creatingDiaryScreenStyle = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
  },
  messageContainer: {
    marginTop: 20,
    height: 24,
    justifyContent: 'center',
  },
  loadingText: {
    textAlign: 'center',
  },
});

const loadingMessages = [
  '붓을 가져오고 있어요..',
  '테두리를 그리고 있어요..',
  '색을 칠하고 있어요..',
  '물감이 마르고 있어요..',
  '하루를 기록하고 있어요..',
];
