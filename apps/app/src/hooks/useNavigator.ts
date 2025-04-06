import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  CreateDiaryStackNavigatorParamList,
  OnboardingStackNavigatorParamList,
  PastDiaryStackNavigatorParamList,
  RootStackNavigatorParamList,
  TabNavigatorParamList,
} from '../types/navigators';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

function useNavigator() {
  const rootStackNavigation =
    useNavigation<StackNavigationProp<RootStackNavigatorParamList>>();
  const onboardingStackNavigation =
    useNavigation<StackNavigationProp<OnboardingStackNavigatorParamList>>();
  const pastDiaryStackNavigation =
    useNavigation<StackNavigationProp<PastDiaryStackNavigatorParamList>>();
  const bottomTabNavigation =
    useNavigation<BottomTabNavigationProp<TabNavigatorParamList>>();
  const createDiaryStackNavigation =
    useNavigation<StackNavigationProp<CreateDiaryStackNavigatorParamList>>();

  return {
    rootStackNavigation,
    onboardingStackNavigation,
    pastDiaryStackNavigation,
    bottomTabNavigation,
    createDiaryStackNavigation,
  };
}

export default useNavigator;
