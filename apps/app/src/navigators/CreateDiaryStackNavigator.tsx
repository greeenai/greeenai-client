import {CreateDiaryStackNavigatorParamList} from '../types/navigators';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {theme} from '@greeenai/design-tokens';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CreateDiaryScreen from '../screens/BottomTab/CreateDiary/HomeScreen';
import SelectImageScreen from '../screens/BottomTab/CreateDiary/SelectImageScreen';
import ConfirmImageScreen from '../screens/BottomTab/CreateDiary/ConfirmImageScreen';
import SelectEmotionScreen from '../screens/BottomTab/CreateDiary/SelectEmotionScreen';
import CreatingDiaryScreen from '../screens/BottomTab/CreateDiary/CreatingDiaryScreen';

const Stack = createNativeStackNavigator<CreateDiaryStackNavigatorParamList>();

const getScreenOptions = (insets: {
  top: number;
}): NativeStackNavigationOptions => ({
  headerShown: true,
  headerShadowVisible: false,
  gestureEnabled: true,
  headerTitleStyle: {
    ...theme.typo['body-18'],
  },
  contentStyle: {
    height: insets.top + 50,
  },
});

function CreateDiaryStackNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={() => getScreenOptions(insets)}>
      <Stack.Screen
        name={'Home'}
        component={CreateDiaryScreen}
        options={{headerTitle: '일기 생성'}}
      />
      <Stack.Screen
        name={'SelectImage'}
        component={SelectImageScreen}
        options={{headerTitle: '사진 선택'}}
      />
      <Stack.Screen
        name={'ConfirmImage'}
        component={ConfirmImageScreen}
        options={{headerTitle: '사진 확인'}}
      />
      <Stack.Screen
        name={'SelectEmotion'}
        component={SelectEmotionScreen}
        options={{headerTitle: '감정 선택'}}
      />
      <Stack.Screen
        name={'CreatingDiary'}
        component={CreatingDiaryScreen}
        options={{headerTitle: '그림일기 생성'}}
      />
    </Stack.Navigator>
  );
}

export default CreateDiaryStackNavigator;
