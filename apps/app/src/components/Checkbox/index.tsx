import {forwardRef, Ref, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import Icon from '../Icon';
import {theme} from '@greeenai/design-tokens';

type CheckboxProps = {
  isDisabled?: boolean;
  defaultChecked?: boolean;
  isChecked?: boolean;
  onChange?: () => void;
  style?: ViewStyle;
};

function Checkbox(
  {
    defaultChecked = false,
    isDisabled = false,
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
    if (isDisabled) {
      return;
    }

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
        isDisabled && checkboxStyle.disabled,
        style,
      ]}>
      {(checkedState || isDisabled) && (
        <Icon name="Check" width={18} height={18} fill={'white'} />
      )}
    </TouchableOpacity>
  );
}

export default forwardRef(Checkbox);

const checkboxStyle = StyleSheet.create({
  base: {
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    borderWidth: 0,
    backgroundColor: theme.palette.primary,
  },
  disabled: {
    borderWidth: 0,
    backgroundColor: theme.palette.gray,
  },
});
