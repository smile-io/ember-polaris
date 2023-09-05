// TODO add other decorators, etc. from polaris-react storybook config
import { breakpoints } from '@shopify/polaris-tokens';

const viewPorts = Object.entries({
  ...breakpoints,
  'breakpoints-xs': '20rem', // Replace the 0px xs breakpoint with 320px (20rem) for testing small screens
}).map(([key, value]) => {
  return {
    name: key,
    styles: { width: value, height: '100%' },
  };
});

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  controls: { expanded: true },
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: { viewports: { ...viewPorts } },
};
