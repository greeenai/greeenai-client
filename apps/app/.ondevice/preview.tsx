import {Preview} from '@storybook/react';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'plain',
      values: [{name: 'plain', value: 'white'}],
    },
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
