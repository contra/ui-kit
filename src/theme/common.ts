import { defaultThemeMap as defaultStitchesThemeMap } from '@stitches/react';
import type * as Stitches from '@stitches/react';
import { colorPrimitives } from 'index';
import { breakpoints } from './breakpoints';
import { fontStacks } from './fonts';

export const commonTokens = {
  borderWeights: {
    /* eslint-disable sort-keys-fix/sort-keys-fix */
    light: '1px',
    normal: '2px',
    bold: '3px',
    extrabold: '4px',
    black: '5px',
    /* eslint-enable sort-keys-fix/sort-keys-fix */
  },
  breakpoints: {
    lg: breakpoints.lg,
    md: breakpoints.md,
    sm: breakpoints.sm,
    xl: breakpoints.xl,
  },
  fonts: fontStacks,
  fontSizes: {
    /* eslint-disable sort-keys-fix/sort-keys-fix */
    base: '1rem',
    tiny: '.75rem',
    xs: '0.875rem',
    sm: '1.25rem',
    md: '1.5rem',
    lg: '2.25rem',
    xl: '3rem',
    /* eslint-enable sort-keys-fix/sort-keys-fix */
  },
  fontWeights: {
    /* eslint-disable sort-keys-fix/sort-keys-fix */
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
    /* eslint-enable sort-keys-fix/sort-keys-fix */
  },
  letterSpacings: {
    /* eslint-disable sort-keys-fix/sort-keys-fix */
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    /* eslint-enable sort-keys-fix/sort-keys-fix */
  },
  lineHeights: {
    /* eslint-disable sort-keys-fix/sort-keys-fix */
    xs: 1,
    sm: 1.25,
    md: 1.5,
    lg: 1.625,
    xl: 1.75,
    /* eslint-enable sort-keys-fix/sort-keys-fix */
  },
  radii: {
    // TODO: Add defined "xs", "sm", "md", "lg", "xl" and "base"
    pill: '9999px',
    rounded: '50%',
    squared: '33%',
  },
  space: {
    /* eslint-disable sort-keys-fix/sort-keys-fix */
    0: '0rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '2.25rem',
    px: '1px',
    1: '0.125rem',
    2: '0.25rem',
    3: '0.375rem',
    4: '0.5rem',
    5: '0.625rem',
    6: '0.75rem',
    7: '0.875rem',
    8: '1rem',
    9: '1.25rem',
    10: '1.5rem',
    11: '1.75rem',
    12: '2rem',
    13: '2.25rem',
    14: '2.5rem',
    15: '2.75rem',
    16: '3rem',
    17: '3.5rem',
    18: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
    /* eslint-enable sort-keys-fix/sort-keys-fix */
  },
  transitions: {
    default: 'all 250ms ease',
  },
  zIndices: {
    1: '100',
    2: '200',
    3: '300',
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    8: '800',
    9: '900',
    10: '1000',
    max: '9999',
  },
};

export const commonColors = {
  ...colorPrimitives,
  // generic colors
  black: '#000000',
  white: '#ffffff',
};

export const commonMedia = {
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  sm: `(min-width: ${commonTokens.breakpoints.sm})`,
  md: `(min-width: ${commonTokens.breakpoints.md})`,
  lg: `(min-width: ${commonTokens.breakpoints.lg})`,
  xl: `(min-width: ${commonTokens.breakpoints.xl})`,
  smMax: `(max-width: ${commonTokens.breakpoints.sm})`,
  mdMax: `(max-width: ${commonTokens.breakpoints.md})`,
  lgMax: `(max-width: ${commonTokens.breakpoints.lg})`,
  xlMax: `(max-width: ${commonTokens.breakpoints.xl})`,
  motion: '(prefers-reduced-motion)',
  safari: 'not all and (min-resolution:.001dpcm)',
  hover: '(any-hover: hover)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
  /* eslint-enable sort-keys-fix/sort-keys-fix */
};

export const commonUtils = {
  /* eslint-disable id-length */
  m: (value: Stitches.PropertyValue<'margin'>) => ({
    margin: value,
  }),
  mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
    marginBottom: value,
  }),
  ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
    marginLeft: value,
  }),
  mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
    marginRight: value,
  }),
  mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
    marginTop: value,
  }),
  mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: Stitches.PropertyValue<'marginTop'>) => ({
    marginBottom: value,
    marginTop: value,
  }),
  p: (value: Stitches.PropertyValue<'padding'>) => ({
    padding: value,
  }),
  pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
    paddingBottom: value,
  }),
  pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
    paddingLeft: value,
  }),
  pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
    paddingRight: value,
  }),
  pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
    paddingTop: value,
  }),
  px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
    paddingBottom: value,
    paddingTop: value,
  }),
  /* eslint-enable id-length */
};

export const commonThemeMap = {
  ...defaultStitchesThemeMap,
  blockSize: 'space',
  borderWidth: 'borderWeights',
  flexBasis: 'space',
  gridTemplateColumns: 'space',
  gridTemplateRows: 'space',
  height: 'space',
  inlineSize: 'space',
  maxBlockSize: 'space',
  maxHeight: 'space',
  maxInlineSize: 'space',
  maxWidth: 'space',
  minBlockSize: 'space',
  minHeight: 'space',
  minInlineSize: 'space',
  minWidth: 'space',
  width: 'space',
};

export const commonTheme = {
  media: commonMedia,
  prefix: 'uikit',
  theme: {
    ...commonTokens,
    colors: commonColors,
  },
  themeMap: commonThemeMap,
  utils: commonUtils,
};
