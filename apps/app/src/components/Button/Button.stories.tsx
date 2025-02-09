import Button from '.';
import {Download, Share} from '../../assets/icons';

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
};

export const LargePrimary = {
  args: {
    children: '다음',
    backgroundColor: 'primary',
  },
};

export const LargeDisabledPrimary = {
  args: {
    children: '다음',
    backgroundColor: 'primary',
    disabled: true,
  },
};

export const LargeWhite = {
  args: {
    children: '다음',
    backgroundColor: 'white',
  },
};

export const LargeLoading = {
  args: {
    children: '다음',
    isLoading: true,
  },
};

export const SmallRoundedPrimary = {
  args: {
    children: '그림일기 작성하기',
    backgroundColor: 'primary',
    size: 'sm',
    variant: 'rounded',
  },
};

export const SmallPrimary = {
  args: {
    children: '저장하기',
    backgroundColor: 'primary',
    size: 'sm',
    leftElement: <Download />,
  },
};

export const SmallWhite = {
  args: {
    children: '공유하기',
    backgroundColor: 'white',
    size: 'sm',
    leftElement: <Share />,
  },
};

export const SmallLoading = {
  args: {
    children: '다음',
    size: 'sm',
    isLoading: true,
  },
};
