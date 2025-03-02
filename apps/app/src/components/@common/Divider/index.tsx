import {KeyOfPalette, theme} from '@greeenai/design-tokens';
import {StyleProp, View, ViewStyle} from 'react-native';

type DividerProps = {
  color?: KeyOfPalette;
  thickness?: number;
  isHorizontal?: boolean;
  style?: StyleProp<ViewStyle>;
};

function Divider({
  color = 'gray',
  thickness = 1,
  isHorizontal = true,
  style,
}: DividerProps) {
  return (
    <View
      style={[
        {
          backgroundColor: theme.palette[color],
          width: isHorizontal ? '100%' : thickness,
          height: isHorizontal ? thickness : '100%',
        },
        style,
      ]}
    />
  );
}

export default Divider;
