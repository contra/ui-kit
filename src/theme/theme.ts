import { textStyles } from '../primitives/textStyles';
import { breakpoints } from './breakpoints';
import { colors, colorCssVariables } from './colors';
import { fonts, fontCssVariables } from './fonts';
import { mediaQueries } from './mediaQueries';
import type { CSSVariables } from './types';

/** This theme is for backwards compatibility with our old styled-system, styled-components setup in CWA */
const theme = {
  breakpoints,
  colors,
  fonts,
  fontSizes: [
    '10px',
    '12px',
    '14px',
    '16px',
    '19px',
    '23px',
    '34px',
    '60px',
    '72px',
    '93px',
  ],
  fontWeights: {
    bold: '700',
    extraBold: '800',
    medium: '500',
    regular: '400',
    semiBold: '600',
  },
  lineHeights: [
    '16px',
    '20px',
    '24px',
    '28px',
    '32px',
    '40px',
    '44px',
    '60px',
    '72px',
    '120px',
  ],
  mediaQueries,
  textStyles,
};

const themeCssVariables: CSSVariables = [
  ...colorCssVariables,
  ...fontCssVariables,
];

export { theme, themeCssVariables };
