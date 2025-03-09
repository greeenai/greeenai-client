import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {OnboardingStackNavigatorParamList} from '../../types/navigators';
import LoginScreen from './LoginScreen';
import TermsAgreementScreen from './TermsAgreement/TermsAgreementScreen';
import ViewPastDiariesScreen from './ViewPastDiariesScreen';
import ChooseAnswerScreen from './ChooseAnswerScreen';
import SelectPhotoScreen from './SelectPhotoScreen';
import ShareOnSNSScreen from './ShareOnSNSScreen';
import OptionalTermsScreen from './TermsAgreement/OptionalTermsScreen';
import RequiredTermsScreen from './TermsAgreement/RequiredTermsScreen';
import Icon from '../../components/@common/Icon';
import {theme} from '@greeenai/design-tokens';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

const Stack = createStackNavigator<OnboardingStackNavigatorParamList>();

const getScreenOptions = (
  routeName: keyof OnboardingStackNavigatorParamList,
  navigation: StackNavigationProp<OnboardingStackNavigatorParamList>,
  insets: {top: number},
): StackNavigationOptions => ({
  headerShown: false,
  gestureEnabled: true,
  headerTitleStyle: {
    ...theme.typo['body-18'],
  },
  headerStyle: {
    height: insets.top + 50,
  },
  headerLeft: () =>
    (routeName === 'RequiredTermsScreen' ||
      routeName === 'OptionalTermsScreen') && (
      <Icon
        name={'LeftChevron'}
        width={26}
        height={26}
        onPress={() => {
          navigation.goBack();
        }}
        style={onboardingFunnelStyle.headerLeft}
      />
    ),
});

function OnboardingFunnel() {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) =>
        getScreenOptions(route.name, navigation, insets)
      }>
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

const onboardingFunnelStyle = StyleSheet.create({
  headerLeft: {
    marginLeft: 16,
  },
});
