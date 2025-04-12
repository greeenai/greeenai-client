import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import SettingScreen from '../screens/BottomTab/SettingScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@greeenai/design-tokens';
import {
  EventArg,
  ParamListBase,
  RouteProp,
  TabNavigationState,
} from '@react-navigation/native';
import {
  KeyOfTabNavigatorParamList,
  TabNavigatorParamList,
} from '../types/navigators';
import {KeyOfIcons} from '../types/Icon';
import Icon from '../components/@common/Icon';
import CreateDiaryIcon from '../components/BottomTab/CreateDiary/CreateDiaryIcon';
import PastDiaryStackNavigator from './PastDiaryStackNavigator';
import CreateDiaryStackNavigator from './CreateDiaryStackNavigator';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const getTabBarIcon = (
  routeName: KeyOfTabNavigatorParamList,
  focused: boolean,
) => {
  if (routeName === 'CreateDiaryStackNavigator') {
    return null;
  }

  const iconNames: Record<
    Exclude<KeyOfTabNavigatorParamList, 'CreateDiaryStackNavigator'>,
    KeyOfIcons
  > = {
    PastDiaryStackNavigator: focused ? 'FilledDiary' : 'Diary',
    Setting: focused ? 'FilledSetting' : 'Setting',
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
    height: 102,
    paddingTop: 14,
    paddingHorizontal: 30,
  },
  tabBarLabelStyle: {
    ...theme.typo['body-12'],
    color: theme.palette.black,
    marginTop: 5,
  },
  tabBarIcon: ({focused}: {focused: boolean}) =>
    route.name === 'CreateDiaryStackNavigator' ? (
      <CreateDiaryIcon />
    ) : (
      getTabBarIcon(route.name, focused)
    ),
});

const pastDiaryStackNavigatorListener = ({
  navigation,
}: {
  navigation: BottomTabNavigationProp<
    TabNavigatorParamList,
    'PastDiaryStackNavigator'
  >;
  route: TabNavigationState<ParamListBase>['routes'][0];
}) => ({
  tabPress: (e: EventArg<'tabPress', true, undefined>) => {
    e.preventDefault();

    navigation.navigate('PastDiaryStackNavigator', {
      screen: 'PastDiary',
    });
  },
});

function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName={'PastDiaryStackNavigator'}
      screenOptions={({route}: {route: RouteProp<TabNavigatorParamList>}) =>
        getScreenOptions(route, insets)
      }>
      <Tab.Screen
        name={'PastDiaryStackNavigator'}
        component={PastDiaryStackNavigator}
        options={{
          headerShown: false,
          headerTitle: '지난 일기',
          tabBarLabel: '내 일기',
        }}
        listeners={pastDiaryStackNavigatorListener}
      />
      <Tab.Screen
        name={'CreateDiaryStackNavigator'}
        component={CreateDiaryStackNavigator}
        options={({route}) => ({
          headerShown: false,
          headerTitle: '일기 생성',
          tabBarLabel: '일기 생성',
          tabBarStyle:
            (route as any).state?.routes[(route as any).state.index]?.name !==
            'Home'
              ? {display: 'none'}
              : {height: 102, paddingTop: 14, paddingHorizontal: 30},
        })}
      />
      <Tab.Screen
        name={'Setting'}
        component={SettingScreen}
        options={{headerTitle: '설정', tabBarLabel: '설정'}}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
