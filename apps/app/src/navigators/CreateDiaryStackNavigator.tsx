import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {CreateDiaryStackNavigatorParamList} from '../types/navigators';
import HomeScreen from '../screens/CreateDiary/HomeScreen';

const Stack = createNativeStackNavigator<CreateDiaryStackNavigatorParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
};

function CreateDiaryStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={screenOptions}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default CreateDiaryStackNavigator;
