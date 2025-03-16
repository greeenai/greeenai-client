import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import {RootStackNavigatorParamList} from '../types/navigators';
import OnboardingFunnel from '../screens/Onboarding/OnboardingFunnel';

const Stack = createNativeStackNavigator<RootStackNavigatorParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
};

function RootStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={screenOptions}>
        <Stack.Screen name={'Onboarding'} component={OnboardingFunnel} />
        <Stack.Screen name={'Tab'} component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
