import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  CreateDiaryStackNavigatorParamList,
  OnboardingStackNavigatorParamList,
  RootStackNavigatorParamList,
  TabNavigatorParamList,
} from '../types/navigators';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

function useNavigator() {
  const rootStackNavigation =
    useNavigation<StackNavigationProp<RootStackNavigatorParamList>>();
  const onboardingStackNavigation =
    useNavigation<StackNavigationProp<OnboardingStackNavigatorParamList>>();
  const createDiaryStackNavigation =
    useNavigation<StackNavigationProp<CreateDiaryStackNavigatorParamList>>();
  const bottomTabNavigation =
    useNavigation<BottomTabNavigationProp<TabNavigatorParamList>>();

  return {
    rootStackNavigation,
    onboardingStackNavigation,
    createDiaryStackNavigation,
    bottomTabNavigation,
  };
}

export default useNavigator;
