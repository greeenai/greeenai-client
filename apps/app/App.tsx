import {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import getPermissions from './src/utils/checkPermissions';
import RootNavigator from './src/navigators/RootNavigator';
import {StyleSheet} from 'react-native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

function App() {
  useEffect(() => {
    getPermissions(
      message => console.log('권한 요청 성공:', message),
      message => console.warn('권한 요청 실패:', message),
    );
  }, []);

  return (
    <GestureHandlerRootView style={rootStyle.gestureHandlerRootView}>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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

const rootStyle = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
