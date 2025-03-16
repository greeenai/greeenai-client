import {PastDiaryStackNavigatorParamList} from '../types/navigators';
import PastDiaryScreen from '../screens/Tab/PastDiary/PastDiaryScreen';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import DiaryContentScreen from '../screens/Tab/PastDiary/DiaryContentScreen';
import Icon from '../components/@common/Icon';
import {theme} from '@greeenai/design-tokens';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<PastDiaryStackNavigatorParamList>();

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

function PastDiaryStackNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator
      initialRouteName={'PastDiary'}
      screenOptions={() => getScreenOptions(insets)}>
      <Stack.Screen
        name={'PastDiary'}
        component={PastDiaryScreen}
        options={{headerTitle: '지난 일기'}}
      />
      <Stack.Screen
        name={'DiaryContent'}
        component={DiaryContentScreen}
        options={({navigation}) => ({
          headerTitle: '일기 상세',
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
    </Stack.Navigator>
  );
}

export default PastDiaryStackNavigator;
