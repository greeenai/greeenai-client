import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/Onboarding';
import TabNavigator from './TabNavigator';
import {RootNavigatorParamList} from '../types/navigators';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tab" screenOptions={screenOptions}>
        <Stack.Screen name={'Onboarding'} component={OnboardingScreen} />
        <Stack.Screen name={'Tab'} component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
