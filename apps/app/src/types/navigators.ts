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
  CreateDiary: undefined;
  PastDiaryStackNavigator: undefined;
  Setting: undefined;
};

export type PastDiaryStackNavigatorParamList = {
  PastDiary: undefined;
  DiaryContent: {
    id: number;
  };
};

export type KeyOfRootStackNavigatorParamList =
  keyof RootStackNavigatorParamList;
export type KeyOfOnboardingStackNavigatorParamList =
  keyof OnboardingStackNavigatorParamList;
export type KeyOfTabNavigatorParamList = keyof TabNavigatorParamList;
