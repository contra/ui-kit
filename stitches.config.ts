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
  media: {
    bp1: '(min-width: 480px)',
  },
  theme: {
    colors: colorPrimitives,
  },
  utils: {
    marginX: (value: string) => ({ marginLeft: value, marginRight: value }),
  },
});
