import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {OnboardingStackNavigatorParamList} from '../../types/navigators';
import LoginScreen from './LoginScreen';
import TermsAgreementScreen from './TermsAgreement/TermsAgreementScreen';
import ViewPastDiariesScreen from './ViewPastDiariesScreen';
import ChooseAnswerScreen from './ChooseAnswerScreen';
import SelectPhotoScreen from './SelectPhotoScreen';
import ShareOnSNSScreen from './ShareOnSNSScreen';
import OptionalTermsScreen from './TermsAgreement/OptionalTermsScreen';
import RequiredTermsScreen from './TermsAgreement/RequiredTermsScreen';

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
      <Stack.Screen
        name="TermsAgreementScreen"
        options={{
          headerShown: true,
          headerTitle: '약관 동의',
          headerBackVisible: false,
        }}>
        {({navigation}) => (
          <TermsAgreementScreen
            onNext={() => navigation.navigate('SelectPhotoScreen')}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="RequiredTermsScreen"
        options={{
          headerShown: true,
          headerTitle: '필수 이용약관',
        }}
        component={RequiredTermsScreen}
      />
      <Stack.Screen
        name="OptionalTermsScreen"
        options={{
          headerShown: true,
          headerTitle: '선택 이용약관',
        }}
        component={OptionalTermsScreen}
      />
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
