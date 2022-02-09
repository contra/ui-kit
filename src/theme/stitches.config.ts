import { createStitches } from '@stitches/react';
import { commonTheme } from './common';
import type { ThemeConfig } from './types';

// export const {
//   styled,
//   css,
//   globalCss,
//   keyframes,
//   getCssText,
//   theme,
//   createTheme,
//   config,
// } = createStitches({
//   media: {},
//   theme: {
//     colors: colorPrimitives,
//     space: {
//       4: '4px',
//       8: '8px',
//       16: '16px',
//       24: '24px',
//       32: '32px',
//       48: '48px',
//       64: '64px',
//       96: '96px',
//       128: '128px',
//     },
//   },
//   utils: {
//     mx: (value: Stitches.ScaleValue<'space'>) => ({
//       marginLeft: value,
//       marginRight: value,
//     }),
//   },
// });

export const {
  createTheme: createThemeBase,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  config,
} = createStitches({
  // TODO: Manually add any "light theme" configs here once added.
  ...commonTheme,
});

export const createTheme = ({
  type,
  theme: newTheme,
  className,
}: ThemeConfig) => {
  if (!type) {
    throw new Error('Theme `type` is required.');
  }

  // TODO: Deeply merge newTheme with light theme.
  return createThemeBase(className ?? `${type}-theme`, newTheme);
};
