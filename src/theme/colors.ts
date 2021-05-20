import { colorPrimitives } from '../primitives/colorPrimitives';
import { generateThemeScaleCssVariables } from './utils';

const [colors, colorCssVariables] = generateThemeScaleCssVariables('color', {
  ...colorPrimitives,
  // In the future we would add component colors etc here.
});

export { colors, colorCssVariables };
