import type * as Stitches from '@stitches/react';
import type { config, createThemeBase, theme } from './stitches.config';

export type BreakpointNames = 'lg' | 'md' | 'sm' | 'xl';

export type Breakpoints = readonly string[] & {
  [breakpoint in BreakpointNames]: string;
};

export type CSSVariables = Array<[cssVariableName: string, value: string]>;

export type ThemeScaleObject = {
  [key: string]: ThemeScaleObject | string;
};

/** Theme interface. */
export type BaseTheme<T = {}> = {
  [Scale in keyof T]: {
    [Token in keyof T[Scale]]: T[Scale][Token] extends boolean | number | string
      ? T[Scale][Token]
      : boolean | number | string;
  };
} & {
  borderStyles?: { [token in number | string]: boolean | number | string };
  borderWidths?: { [token in number | string]: boolean | number | string };
  colors?: { [token in number | string]: boolean | number | string };
  fontSizes?: { [token in number | string]: boolean | number | string };
  fontWeights?: { [token in number | string]: boolean | number | string };
  fonts?: { [token in number | string]: boolean | number | string };
  letterSpacings?: { [token in number | string]: boolean | number | string };
  lineHeights?: { [token in number | string]: boolean | number | string };
  radii?: { [token in number | string]: boolean | number | string };
  shadows?: { [token in number | string]: boolean | number | string };
  sizes?: { [token in number | string]: boolean | number | string };
  space?: { [token in number | string]: boolean | number | string };
  transitions?: { [token in number | string]: boolean | number | string };
  zIndices?: { [token in number | string]: boolean | number | string };
};

export type ThemeType = 'light';

export type ThemeConfig = {
  className?: string;
  theme?: BaseTheme;
  type?: ThemeType | string;
};

export type UIKitThemeContextProps = {
  isDark?: boolean;
  theme?: UIKitTheme;
  type: ThemeType | string;
};

export type VariantProps<T> = Stitches.VariantProps<T>;
export type CSS = Stitches.CSS<typeof config>;
export type UIKitTheme = typeof theme;
export type CreateTheme = ReturnType<typeof createThemeBase>;
