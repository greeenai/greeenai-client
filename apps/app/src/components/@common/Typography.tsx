import {KeyOfPalette, KeyOfTypo, theme} from '@greeenai/design-tokens';
import {ReactNode} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

type TypographyProps = {
  children: ReactNode;
  type?: KeyOfTypo;
  color?: KeyOfPalette;
  style?: StyleProp<TextStyle>;
};

function Typography({
  children,
  type = 'body-12',
  color = 'black',
  style,
}: TypographyProps) {
  const typographyStyle = theme.typo[type];

  return (
    <Text style={[typographyStyle, {color: theme.palette[color]}, style]}>
      {children}
    </Text>
  );
}

export default Typography;
