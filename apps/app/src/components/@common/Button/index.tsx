import {KeyOfPalette, theme} from '@greeenai/design-tokens';
import {ForwardedRef, forwardRef, ReactNode} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import Typography from '../Typography';
import {ButtonSize, ButtonVariant} from './Button.types';
import Loading from '../Loading';

type ButtonProps = {
  children: ReactNode;
  leftElement?: ReactNode;
  disabled?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  isLoading?: boolean;
  backgroundColor?: KeyOfPalette;
  onPress: () => void;
  width?: ViewStyle['width'];
  style?: StyleProp<ViewStyle>;
};

const getButtonStyle = (
  size: ButtonSize,
  variant: ButtonVariant,
  disabled: boolean,
  backgroundColor: KeyOfPalette,
  width: ViewStyle['width'],
) => ({
  ...buttonBaseStyle,
  ...sizeStyle[size],
  ...borderRadiusStyle[variant][size],
  ...getBorderStyle(backgroundColor),
  backgroundColor: getBackgroundColor(backgroundColor, disabled),
  ...(width ? {width} : {}),
});

const getTextColor = (backgroundColor: KeyOfPalette) =>
  backgroundColor === 'primary' ? 'white' : 'black';

const getLoadingColor = (backgroundColor: KeyOfPalette) =>
  backgroundColor === 'white' ? 'primary' : 'white';

function Button(
  {
    children,
    leftElement,
    disabled = false,
    size = 'lg',
    variant = 'default',
    isLoading,
    backgroundColor = 'primary',
    onPress,
    width,
    style,
  }: ButtonProps,
  ref: ForwardedRef<View>,
) {
  return (
    <TouchableOpacity
      ref={ref}
      disabled={disabled}
      onPress={onPress}
      style={[
        getButtonStyle(size, variant, disabled, backgroundColor, width),
        style,
      ]}>
      {isLoading ? (
        <Loading color={getLoadingColor(backgroundColor)} />
      ) : (
        <>
          {leftElement}
          <Typography type="button-14" color={getTextColor(backgroundColor)}>
            {children}
          </Typography>
        </>
      )}
    </TouchableOpacity>
  );
}

export default forwardRef(Button);

const buttonBaseStyle: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: 7,
  alignItems: 'center',
  justifyContent: 'center',
};

const sizeStyle: Record<ButtonSize, ViewStyle> = {
  lg: {height: 49, width: 360},
  sm: {height: 33, width: 144},
};

const borderRadiusStyle: Record<
  ButtonVariant,
  Record<ButtonSize, ViewStyle>
> = {
  default: {lg: {borderRadius: 12}, sm: {borderRadius: 8}},
  rounded: {lg: {borderRadius: 12}, sm: {borderRadius: 20}},
};

const getBackgroundColor = (backgroundColor: KeyOfPalette, disabled: boolean) =>
  disabled ? theme.palette.gray : theme.palette[backgroundColor];

const getBorderStyle = (backgroundColor: KeyOfPalette): ViewStyle =>
  backgroundColor === 'white'
    ? {borderWidth: 1, borderColor: theme.palette.gray}
    : {};
