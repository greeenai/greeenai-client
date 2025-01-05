import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import getPermissions from './src/utils/checkPermissions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function App() {
  useEffect(() => {
    getPermissions(
      message => console.log('권한 요청 성공:', message),
      message => console.warn('권한 요청 실패:', message),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
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
