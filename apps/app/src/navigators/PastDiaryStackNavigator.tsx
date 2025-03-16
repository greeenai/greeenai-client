import {PastDiaryStackNavigatorParamList} from '../types/navigators';
import PastDiaryScreen from '../screens/Tab/PastDiaryScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<PastDiaryStackNavigatorParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
};

function PastDiaryStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={'PastDiary'}
      screenOptions={screenOptions}>
      <Stack.Screen name={'PastDiary'} component={PastDiaryScreen} />
    </Stack.Navigator>
  );
}

export default PastDiaryStackNavigator;
