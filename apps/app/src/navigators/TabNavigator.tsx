import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CreateDiaryScreen from '../screens/Tab/CreateDiary';
import HomeScreen from '../screens/Tab/Home';
import SettingScreen from '../screens/Tab/Setting';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@greeenai/design-tokens';
import {RouteProp} from '@react-navigation/native';
import {
  KeyOfTabNavigatorParamList,
  TabNavigatorParamList,
} from '../types/navigators';
import {KeyOfIcons} from '../types/Icon';
import Icon from '../components/@common/Icon';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const getTabBarIcon = (
  routeName: KeyOfTabNavigatorParamList,
  focused: boolean,
) => {
  const iconNames: Record<KeyOfTabNavigatorParamList, KeyOfIcons> = {
    Home: focused ? 'FilledHome' : 'Home',
    Setting: focused ? 'FilledSetting' : 'Setting',
    CreateDiary: focused ? 'FilledDiary' : 'Diary',
  };

  return <Icon name={iconNames[routeName]} />;
};

const getScreenOptions = (
  route: RouteProp<TabNavigatorParamList>,
  insets: {top: number},
) => ({
  headerShown: true,
  headerShadowVisible: false,
  headerStyle: {
    height: insets.top + 56,
  },
  headerTitleStyle: {
    ...theme.typo['headline-20'],
  },
  tabBarStyle: {
    height: 102,
    paddingTop: 18,
  },
  tabBarLabel: '',
  tabBarIcon: ({focused}: {focused: boolean}) =>
    getTabBarIcon(route.name, focused),
});

function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({route}: {route: RouteProp<TabNavigatorParamList>}) =>
        getScreenOptions(route, insets)
      }>
      <Tab.Screen
        name={'CreateDiary'}
        component={CreateDiaryScreen}
        options={{headerTitle: '일기 생성'}}
      />
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{headerTitle: '지난 일기'}}
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
