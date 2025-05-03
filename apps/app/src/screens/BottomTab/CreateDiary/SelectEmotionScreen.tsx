import {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Typography from '../../../components/@common/Typography';
import {RouteProp, useRoute} from '@react-navigation/native';
import {CreateDiaryStackNavigatorParamList} from '../../../types/navigators';
import {screenWidth} from '../../../constants/screenDimensions';
import {palette} from '../../../../../../packages/design-tokens/src/palette';
import Button from '../../../components/@common/Button';
import useNavigator from '../../../hooks/useNavigator';

type SelectEmotionRouteProp = RouteProp<
  CreateDiaryStackNavigatorParamList,
  'SelectEmotion'
>;

function SelectEmotionScreen() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [customAnswer, setCustomAnswer] = useState('');
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);

  const route = useRoute<SelectEmotionRouteProp>();
  const {createDiaryStackNavigation} = useNavigator();

  const selectedPhotos = route.params?.selectedPhotos || [];
  const currentPhoto = selectedPhotos[selectedPhotoIndex];

  const handleSelectQuestion = (index: number) => {
    setSelectedQuestionIndex(index);
    setCustomAnswer('');
  };

  const handleChangeCustomAnswerText = (text: string) => {
    setCustomAnswer(text);
    if (text.length > 0) {
      setSelectedQuestionIndex(null);
    }
  };

  const handlePressNextButton = () => {
    if (selectedQuestionIndex === null && customAnswer.length === 0) {
      Alert.alert('알림', '질문에 답변해주세요', [
        {text: '확인', style: 'default'},
      ]);
      return;
    }

    if (selectedPhotoIndex < 2) {
      // TODO 서버에 답변 보내기
      setSelectedQuestionIndex(null);
      setCustomAnswer('');
      setSelectedPhotoIndex(prev => prev + 1);
      return;
    }

    createDiaryStackNavigation.navigate('CreatingDiary');
  };

  return (
    <ScreenLayout style={selectEmotionScreenStyle.container}>
      <Typography
        type={'headline-20'}
        style={selectEmotionScreenStyle.questionText}>
        {'이 사진을 찍을 때\n어떤 감정이었나요?'}
      </Typography>

      <View style={selectEmotionScreenStyle.imageContainer}>
        <Image
          source={{uri: currentPhoto}}
          style={selectEmotionScreenStyle.image}
          resizeMode="stretch"
        />
      </View>

      <View style={selectEmotionScreenStyle.questionListContainer}>
        {mockQuestionList.map(({question}, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectQuestion(index)}
            style={[
              selectEmotionScreenStyle.questionContainer,
              selectedQuestionIndex === index &&
                selectEmotionScreenStyle.selectedQuestion,
            ]}>
            <Typography type={'button-14'}>{question}</Typography>
          </TouchableOpacity>
        ))}
        <View style={selectEmotionScreenStyle.questionContainer}>
          <TextInput
            style={selectEmotionScreenStyle.customAnswerInput}
            placeholder="나만의 답변 입력하기 ✏️"
            placeholderTextColor={palette.gray}
            value={customAnswer}
            onChangeText={handleChangeCustomAnswerText}
          />
        </View>
      </View>

      <View style={selectEmotionScreenStyle.bottomButtonContainer}>
        <Button onPress={handlePressNextButton}>다음</Button>
      </View>
    </ScreenLayout>
  );
}

export default SelectEmotionScreen;

const selectEmotionScreenStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  questionText: {
    alignSelf: 'flex-start',
  },
  imageContainer: {
    width: screenWidth - 85,
    height: screenWidth - 85,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  questionListContainer: {
    width: '100%',
    gap: 10,
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: palette.gray,
    height: 45,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  selectedQuestion: {
    borderColor: palette.primary,
  },
  customAnswerInput: {
    height: '100%',
    fontSize: 14,
    fontWeight: '500',
    color: palette.black,
  },
  bottomButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
});

const mockQuestionList = [
  {
    question: '맛있는 음식을 먹을 생각에 기분이 좋았어 😋',
  },
  {
    question: '힘든 하루에 달콤한 디저트를 보니 위로가 되었어 🍧',
  },
  {
    question: '친구와 함께해서 더욱 즐거운 시간이었어 💖',
  },
  {
    question: '음식이 너무 늦게 나와서 기다리기 힘들었어 😮‍💨',
  },
];
