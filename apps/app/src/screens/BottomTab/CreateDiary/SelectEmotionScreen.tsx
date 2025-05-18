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
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null,
  );

  const route = useRoute<SelectEmotionRouteProp>();
  const {createDiaryStackNavigation} = useNavigator();

  const selectedPhotos = route.params?.selectedPhotos || [];
  const questionList = route.params?.diaryQuestions || [];
  const currentPhoto = selectedPhotos[selectedPhotoIndex];

  const handleSelectQuestion = (id: number) => {
    setSelectedQuestionId(id);
    setCustomAnswer('');
  };

  const handleChangeCustomAnswerText = (text: string) => {
    setCustomAnswer(text);
    if (text.length > 0) {
      setSelectedQuestionId(null);
    }
  };

  const handlePressNextButton = () => {
    if (setSelectedQuestionId === null && customAnswer.length === 0) {
      Alert.alert('알림', '질문에 답변해주세요', [
        {text: '확인', style: 'default'},
      ]);
      return;
    }

    if (selectedPhotoIndex < 2) {
      // TODO 서버에 답변 보내기
      setSelectedQuestionId(null);
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
        {questionList[selectedPhotoIndex].diaryQuestions.map(
          ({content, id}) => (
            <TouchableOpacity
              key={id}
              onPress={() => handleSelectQuestion(id)}
              style={[
                selectEmotionScreenStyle.questionContainer,
                selectedQuestionId === id &&
                  selectEmotionScreenStyle.selectedQuestion,
              ]}>
              <Typography type={'button-14'}>{content}</Typography>
            </TouchableOpacity>
          ),
        )}
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
