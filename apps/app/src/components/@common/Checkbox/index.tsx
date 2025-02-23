import {forwardRef, Ref, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from '../Icon';
import {theme} from '@greeenai/design-tokens';

type CheckboxProps = {
  defaultChecked?: boolean;
  isChecked?: boolean;
  onChange?: () => void;
  style?: StyleProp<ViewStyle>;
};

function Checkbox(
  {
    defaultChecked = false,
    isChecked: isCheckedProp,
    onChange,
    style,
  }: CheckboxProps,
  ref: Ref<View>,
) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = isCheckedProp !== undefined;
  const checkedState = isControlled ? isCheckedProp : internalChecked;

  const handlePress = () => {
    onChange?.();
    if (!isControlled) {
      setInternalChecked(prevChecked => !prevChecked);
    }
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handlePress}
      activeOpacity={1}
      style={[
        checkboxStyle.base,
        checkedState && checkboxStyle.checked,
        style,
      ]}>
      <Icon name="Check" width={20} height={20} fill={'white'} />
    </TouchableOpacity>
  );
}

export default forwardRef(Checkbox);

const checkboxStyle = StyleSheet.create({
  base: {
    width: 20,
    height: 20,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.gray,
  },
  checked: {
    backgroundColor: theme.palette.primary,
  },
});
