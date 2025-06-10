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

export type AnswerPerPhoto = {
  questionId: number;
  answerContent: string;
};

type SelectEmotionRouteProp = RouteProp<
  CreateDiaryStackNavigatorParamList,
  'SelectEmotion'
>;

function SelectEmotionScreen() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [customAnswer, setCustomAnswer] = useState('');
  const [answers, setAnswers] = useState<AnswerPerPhoto[]>([]);

  const route = useRoute<SelectEmotionRouteProp>();
  const {createDiaryStackNavigation} = useNavigator();

  const selectedPhotos = route.params?.selectedPhotos || [];
  const questionList = route.params?.diaryQuestions || [];
  const diaryId = route.params?.diaryId;
  const currentPhoto = selectedPhotos[selectedPhotoIndex];
  const currentQuestion = questionList[selectedPhotoIndex];

  const handleSelectQuestion = (questionId: number, answerContent: string) => {
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[selectedPhotoIndex] = {
        questionId,
        answerContent,
      };

      return updatedAnswers;
    });
    setCustomAnswer('');
  };

  const handleChangeCustomAnswerText = (
    questionId: number,
    answerContent: string,
  ) => {
    setCustomAnswer(answerContent);
    if (answerContent.length > 0) {
      setAnswers(prevAnswers => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[selectedPhotoIndex] = {
          questionId,
          answerContent,
        };

        return updatedAnswers;
      });
    }
  };

  const handlePressNextButton = async () => {
    if (answers[selectedPhotoIndex] === null && customAnswer.length === 0) {
      Alert.alert('알림', '질문에 답변해주세요', [
        {text: '확인', style: 'default'},
      ]);
      return;
    }

    if (selectedPhotoIndex < 2) {
      setCustomAnswer('');
      setSelectedPhotoIndex(prev => prev + 1);
      return;
    }

    createDiaryStackNavigation.navigate('CreatingDiary', {
      diaryId,
      diaryQuestionAnswers: answers,
    });
  };

  return (
    <ScreenLayout isKeyboardAvoiding style={selectEmotionScreenStyle.container}>
      <Typography
        type={'headline-20'}
        style={selectEmotionScreenStyle.questionText}>
        {currentQuestion.prompt}
      </Typography>

      <View style={selectEmotionScreenStyle.imageContainer}>
        <Image
          source={{uri: currentPhoto}}
          style={selectEmotionScreenStyle.image}
          resizeMode="stretch"
        />
      </View>

      <View style={selectEmotionScreenStyle.questionListContainer}>
        {currentQuestion.options.map(({content, id}) => (
          <TouchableOpacity
            key={id}
            onPress={() => handleSelectQuestion(currentQuestion.id, content)}
            style={[
              selectEmotionScreenStyle.questionContainer,
              answers[selectedPhotoIndex]?.answerContent === content &&
                selectEmotionScreenStyle.selectedQuestion,
            ]}>
            <Typography type={'button-14'}>{content}</Typography>
          </TouchableOpacity>
        ))}
        <View style={selectEmotionScreenStyle.questionContainer}>
          <TextInput
            style={selectEmotionScreenStyle.customAnswerInput}
            placeholder="나만의 답변 입력하기 ✏️"
            placeholderTextColor={palette.gray}
            value={customAnswer}
            onChangeText={(text: string) =>
              handleChangeCustomAnswerText(currentQuestion.id, text)
            }
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
    justifyContent: 'space-between',
    paddingBottom: 30,
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
  },
});
