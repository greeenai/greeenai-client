import {CSSProperties} from 'react';
import {KeyOfIcons} from '../../types/Icon';
import {KeyOfPalette, theme} from '@greeenai/design-tokens';
import * as Icons from '../../assets/icons';

type IconProps = {
  name: KeyOfIcons;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  fill?: KeyOfPalette;
  style?: CSSProperties | CSSProperties[];
  onPress?: (...args: any[]) => void;
};

function Icon({
  name,
  width = 32,
  height = 32,
  fill = 'black',
  ...props
}: IconProps) {
  const SvgIcon = Icons[name];

  return (
    <SvgIcon
      width={width}
      height={height}
      style={{color: theme.palette[fill]}}
      {...props}
    />
  );
}

export default Icon;
