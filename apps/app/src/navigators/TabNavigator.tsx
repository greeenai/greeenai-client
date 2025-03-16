import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PastDiaryScreen from '../screens/Tab/PastDiaryScreen';
import SettingScreen from '../screens/Tab/SettingScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@greeenai/design-tokens';
import {RouteProp} from '@react-navigation/native';
import {
  KeyOfTabNavigatorParamList,
  TabNavigatorParamList,
} from '../types/navigators';
import {KeyOfIcons} from '../types/Icon';
import Icon from '../components/@common/Icon';
import CreateDiaryScreen from '../screens/Tab/CreateDiaryScreen';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const getTabBarIcon = (
  routeName: KeyOfTabNavigatorParamList,
  focused: boolean,
) => {
  const iconNames: Record<KeyOfTabNavigatorParamList, KeyOfIcons> = {
    PastDiary: focused ? 'FilledDiary' : 'Diary',
    Setting: focused ? 'FilledSetting' : 'Setting',
    CreateDiary: 'FilledSetting',
  };

  return <Icon name={iconNames[routeName]} />;
};

const getScreenOptions = (
  route: RouteProp<TabNavigatorParamList>,
  insets: {top: number},
) => ({
  headerShown: true,
  headerShadowVisible: false,
  headerTitleStyle: {
    ...theme.typo['body-18'],
  },
  headerStyle: {
    height: insets.top + 50,
  },
  tabBarStyle: {
    height: 92,
    paddingTop: 14,
    paddingHorizontal: 30,
  },
  tabBarLabel: '',
  tabBarIcon: ({focused}: {focused: boolean}) =>
    getTabBarIcon(route.name, focused),
});

function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={'PastDiary'}
      screenOptions={({route}: {route: RouteProp<TabNavigatorParamList>}) =>
        getScreenOptions(route, insets)
      }>
      <Tab.Screen
        name={'PastDiary'}
        component={PastDiaryScreen}
        options={{headerTitle: '지난 일기'}}
      />
      <Tab.Screen
        name={'CreateDiary'}
        component={CreateDiaryScreen}
        options={{
          headerTitle: '일기 생성',
        }}
      />
      <Tab.Screen
        name={'Setting'}
        component={SettingScreen}
        options={{headerTitle: '설정'}}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
