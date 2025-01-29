import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CreateDiaryScreen from '../screens/Tab/CreateDiary';
import HomeScreen from '../screens/Tab/Home';
import SettingScreen from '../screens/Tab/Setting';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@greeenai/design-tokens';
import Icon from '../components/Icon';
import {RouteProp} from '@react-navigation/native';

type TabNavigatorParamList = {
  CreateDiary: undefined;
  Home: undefined;
  Setting: undefined;
};

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const tabBarIconMapping = {
  Home: <Icon name={'Home'} />,
  Setting: <Icon name={'Setting'} />,
  CreateDiary: <Icon name={'Diary'} />,
};

function TabNavigator() {
  const insets = useSafeAreaInsets();

  const screenOptions = ({
    route,
  }: {
    route: RouteProp<TabNavigatorParamList>;
  }) => ({
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
    tabBarIcon: () => tabBarIconMapping[route.name],
  });

  return (
    <Tab.Navigator initialRouteName={'Home'} screenOptions={screenOptions}>
      <Tab.Screen
        name={'CreateDiary'}
        component={CreateDiaryScreen}
        options={{headerTitle: '새 일기 생성'}}
      />
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{headerTitle: '지난 일기 보기'}}
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
