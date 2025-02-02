import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {OnboardingStackNavigatorParamList} from '../../types/navigators';
import LoginScreen from './LoginScreen';
import TermsAgreementScreen from './TermsAgreementScreen';
import ViewPastDiariesScreen from './ViewPastDiariesScreen';
import ChooseAnswerScreen from './ChooseAnswerScreen';
import SelectPhotoScreen from './SelectPhotoScreen';
import ShareOnSNSScreen from './ShareOnSNSScreen';

const Stack = createNativeStackNavigator<OnboardingStackNavigatorParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
};

function OnboardingFunnel() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="LoginScreen">
        {({navigation}) => (
          <LoginScreen
            onNext={() => navigation.navigate('TermsAgreementScreen')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="TermsAgreementScreen">
        {({navigation}) => (
          <TermsAgreementScreen
            onNext={() => navigation.navigate('SelectPhotoScreen')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="SelectPhotoScreen">
        {({navigation}) => (
          <SelectPhotoScreen
            onNext={() => navigation.navigate('ChooseAnswerScreen')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ChooseAnswerScreen">
        {({navigation}) => (
          <ChooseAnswerScreen
            onNext={() => navigation.navigate('ViewPastDiariesScreen')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ViewPastDiariesScreen">
        {({navigation}) => (
          <ViewPastDiariesScreen
            onNext={() => navigation.navigate('ShareOnSNSScreen')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ShareOnSNSScreen">
        {({navigation}) => (
          <ShareOnSNSScreen onNext={() => navigation.navigate('Tab')} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default OnboardingFunnel;
