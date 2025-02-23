import {CSSProperties, forwardRef, Ref} from 'react';
import {KeyOfPalette, theme} from '@greeenai/design-tokens';
import {KeyOfIcons} from '../../types/Icon';
import * as Icons from '../../assets/icons';
import {StyleProp, View, ViewStyle} from 'react-native';

type IconProps = {
  name: KeyOfIcons;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  fill?: KeyOfPalette;
  style?: StyleProp<ViewStyle>;
  onPress?: (...args: any[]) => void;
};

function Icon(
  {name, width = 32, height = 32, fill = 'black', ...props}: IconProps,
  ref: Ref<View>,
) {
  const SvgIcon = Icons[name];

  return (
    <SvgIcon
      ref={ref}
      width={width}
      height={height}
      style={{color: theme.palette[fill]}}
      {...props}
    />
  );
}

export default forwardRef(Icon);
