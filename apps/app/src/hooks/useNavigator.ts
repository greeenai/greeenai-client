import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {OnboardingStackNavigatorParamList} from '../types/navigators';

function useNavigator() {
  const onboardingStackNavigation =
    useNavigation<StackNavigationProp<OnboardingStackNavigatorParamList>>();

  return {onboardingStackNavigation};
}

export default useNavigator;
