import {useState} from 'react';
import Checkbox from '.';

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export const Checked = {
  args: {
    defaultChecked: true,
  },
};

export const UnChecked = {
  args: {
    defaultChecked: false,
  },
};

export const Controlled = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChangeCheckbox = () => {
    setIsChecked(prevIsChecked => !prevIsChecked);
  };

  return <Checkbox isChecked={isChecked} onChange={handleChangeCheckbox} />;
};

export const Disabled = {
  args: {
    isDisabled: true,
  },
};
