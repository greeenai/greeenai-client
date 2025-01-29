import {ParamListBase} from '@react-navigation/native';

export interface RootStackNavigatorParamList extends ParamListBase {
  Onboarding: undefined;
  Tab: undefined;
}

export interface TabNavigatorParamList extends ParamListBase {
  CreateDiary: undefined;
  Home: undefined;
  Setting: undefined;
}

export type KeyOfTabNavigatorParamList = keyof TabNavigatorParamList;
