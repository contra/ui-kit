// Primitives
export { colorPrimitives } from './primitives/colorPrimitives';
export { textStyles } from './primitives/textStyles';

// Icons
export * from './icons';

// Theme
export {
  createBreakpoints,
  fontStack,
  generateCSSVariablesMap,
  generateThemeScaleCssVariables,
} from './theme/utils';
export {
  theme as styledComponentsTheme,
  themeCssVariables,
} from './theme/theme';
export { UIKitProvider } from './theme/UIKitProvider';
export {
  styled,
  css,
  theme,
  createTheme,
  getCssText,
  globalCss,
  keyframes,
  config,
} from './theme/stitches.config';
export type {
  VariantProps,
  CSS,
  ThemeConfig,
  UIKitTheme,
  ThemeType,
  CreateTheme,
  UIKitThemeContextProps,
} from './theme/types';
