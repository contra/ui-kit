import { breakpoints } from './breakpoints';

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const mediaQueries = {
  dark: '@media (prefers-color-scheme: dark)',
  reduceMotion: '@media (prefers-reduced-motion)',
  sm: `@media screen and (min-width: ${breakpoints.sm})`,
  md: `@media screen and (min-width: ${breakpoints.md})`,
  lg: `@media screen and (min-width: ${breakpoints.lg})`,
  xl: `@media screen and (min-width: ${breakpoints.xl})`,
};
/* eslint-enable sort-keys-fix/sort-keys-fix */
