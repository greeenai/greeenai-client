import {KeyOfPalette} from '@greeenai/design-tokens';
import {ActivityIndicator, StyleProp, View, ViewStyle} from 'react-native';

type LoadingProps = {
  color?: KeyOfPalette;
  size?: 'large' | 'medium' | 'small';
  style?: StyleProp<ViewStyle>
};

function Loading({color = 'white'}: LoadingProps) {
  return (
    <View style={loadingStyle.container}>
      <ActivityIndicator size="small" color={color} />
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
