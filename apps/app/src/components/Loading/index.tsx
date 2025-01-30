import {theme} from '@greeenai/design-tokens';
import {ActivityIndicator, View} from 'react-native';

function Loading() {
  return (
    <View style={loadingStyle.container}>
      <ActivityIndicator size="large" color={theme.palette.primary} />
    </View>
  );
}

export default Loading;

const loadingStyle = {
  container: {
    flex: 1,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },
};
