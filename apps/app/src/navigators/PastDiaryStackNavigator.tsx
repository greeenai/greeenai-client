import {PastDiaryStackNavigatorParamList} from '../types/navigators';
import PastDiaryScreen from '../screens/Tab/PastDiary/PastDiaryScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import DiaryContentScreen from '../screens/Tab/PastDiary/DiaryContentScreen';

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
      <Stack.Screen name={'DiaryContent'} component={DiaryContentScreen} />
    </Stack.Navigator>
  );
}

export default PastDiaryStackNavigator;
