import type * as Stitches from '@stitches/react';
import { createStitches } from '@stitches/react';
import { colorPrimitives } from './primitives/colorPrimitives';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  media: {},
  theme: {
    colors: colorPrimitives,
    space: {
      4: '4px',
      8: '8px',
      16: '16px',
      24: '24px',
      32: '32px',
      48: '48px',
      64: '64px',
      96: '96px',
      128: '128px',
    },
  },
  utils: {
    mx: (value: Stitches.ScaleValue<'space'>) => ({
      marginLeft: value,
      marginRight: value,
    }),
  },
});
