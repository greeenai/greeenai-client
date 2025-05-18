import {NavigatorScreenParams} from '@react-navigation/native';
import {Question} from '../apis/diary/index.types';
import { AnswerPerPhoto } from '../screens/BottomTab/CreateDiary/SelectEmotionScreen';

export type RootStackNavigatorParamList = {
  Onboarding: undefined;
  Tab: undefined;
};

export type OnboardingStackNavigatorParamList = {
  LoginScreen: undefined;
  TermsAgreementScreen: undefined;
  RequiredTermsScreen: undefined;
  OptionalTermsScreen: undefined;
  SelectPhotoScreen: undefined;
  ChooseAnswerScreen: undefined;
  ViewPastDiariesScreen: undefined;
  ShareOnSNSScreen: undefined;
};

export type TabNavigatorParamList = {
  CreateDiaryStackNavigator:
    | NavigatorScreenParams<CreateDiaryStackNavigatorParamList>
    | undefined;
  PastDiaryStackNavigator:
    | undefined
    | {
        screen?: keyof PastDiaryStackNavigatorParamList;
        params?: PastDiaryStackNavigatorParamList[keyof PastDiaryStackNavigatorParamList];
      };
  Setting: undefined;
};

export type PastDiaryStackNavigatorParamList = {
  PastDiary: undefined;
  DiaryContent: {
    id: number;
    entryDate: string;
    content: string;
    imageUrl: string;
    isPast: boolean;
  };
};

export type CreateDiaryStackNavigatorParamList = {
  Home: undefined;
  SelectPhoto: undefined;
  ConfirmPhoto: {
    selectedPhotos: string[];
  };
  SelectEmotion: {
    diaryId: number;
    selectedPhotos: string[];
    diaryQuestions: Question[];
  };
  CreatingDiary: {
    diaryId: number;
    diaryQuestionAnswers: AnswerPerPhoto[];
  };
};

export type KeyOfRootStackNavigatorParamList =
  keyof RootStackNavigatorParamList;
export type KeyOfOnboardingStackNavigatorParamList =
  keyof OnboardingStackNavigatorParamList;
export type KeyOfTabNavigatorParamList = keyof TabNavigatorParamList;
