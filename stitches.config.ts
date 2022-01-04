import { createStitches } from '@stitches/react';
import { colorPrimitives } from './src/primitives/colorPrimitives';

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
  },
  utils: {},
});
