import {TouchableOpacity} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {theme} from '@greeenai/design-tokens';
import {CreateDiaryStackNavigatorParamList} from '../types/navigators';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CreateDiaryScreen from '../screens/BottomTab/CreateDiary/HomeScreen';
import SelectEmotionScreen from '../screens/BottomTab/CreateDiary/SelectEmotionScreen';
import CreatingDiaryScreen from '../screens/BottomTab/CreateDiary/CreatingDiaryScreen';
import Icon from '../components/@common/Icon';
import SelectPhotoScreen from '../screens/BottomTab/CreateDiary/SelectPhotoScreen';
import ConfirmPhotoScreen from '../screens/BottomTab/CreateDiary/ConfirmPhotoScreen';

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
        name={'SelectPhoto'}
        component={SelectPhotoScreen}
        options={({navigation}) => ({
          headerTitle: '사진 선택',
          headerLeft: () => (
            <Icon
              name={'LeftChevron'}
              width={20}
              height={20}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name={'ConfirmPhoto'}
        component={ConfirmPhotoScreen}
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
