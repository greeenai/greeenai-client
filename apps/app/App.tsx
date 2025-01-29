import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import getPermissions from './src/utils/checkPermissions';
import RootNavigator from './src/navigators/RootNavigator';

function App() {
  useEffect(() => {
    getPermissions(
      message => console.log('권한 요청 성공:', message),
      message => console.warn('권한 요청 실패:', message),
    );
  }, []);

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

if (__DEV__) {
  require('./ReactotronConfig');
}

export default AppEntryPoint;
