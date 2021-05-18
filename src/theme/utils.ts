import type { Breakpoints, CSSVariables, ThemeScaleObject } from './types';

const hasMoreKeys = (keys: string[]): keys is [string, ...string[]] => {
  if (keys.length) return true;

  return false;
};

const set = (
  scale: ThemeScaleObject,
  [first, ...rest]: [string, ...string[]],
  value: string
): ThemeScaleObject => {
  const newScale = scale[first] ?? {};

  return {
    ...scale,
    [first]:
      typeof newScale === 'object' && hasMoreKeys(rest)
        ? set(newScale, rest, value)
        : value,
  };
};

export const createBreakpoints = (
  sm: string,
  md: string,
  lg: string,
  xl: string
): Breakpoints => {
  return Object.assign([], [sm, md, lg, xl], {
    lg,
    md,
    sm,
    xl,
  });
};

export const fontStack = (fonts: string[]): string => {
  return fonts
    .map((font) => (font.includes(' ') ? `"${font}"` : font))
    .join(', ');
};

export const generateCSSVariablesMap = (
  scaleName: string,
  themeScaleObject: ThemeScaleObject,
  rootScale = true
): CSSVariables => {
  const cssVariables: CSSVariables = [];
  const scaleEntries = Object.entries(themeScaleObject);

  for (const [key, value] of scaleEntries) {
    const scaleKey = [rootScale ? '-' : null, scaleName, key]
      .filter(Boolean)
      .join('-');

    if (typeof value === 'string') {
      cssVariables.push([scaleKey, value]);
    } else {
      cssVariables.push(...generateCSSVariablesMap(scaleKey, value, false));
    }
  }

  return cssVariables;
};

/**
 * Given a theme scale object, this returns a modified version with the
 * values converted to CSS vars (ie `var(--scaleName-some-key)`).
 *
 * Returns a tuple of `scale` and `cssVars`.
 *
 * `scale` is an object with the same structure as the input object
 * but values are transformed to:
 * `var(--scaleName-some-key)`.
 *
 * `cssVars` is an array of tuples that contain they var key and original value:
 * `[['--scaleName-some-key', '#131313']]`
 */
export const generateThemeScaleCssVariables = (
  scaleName: string,
  scale: ThemeScaleObject
): [scale: ThemeScaleObject, cssVars: CSSVariables] => {
  const cssVariables = generateCSSVariablesMap(scaleName, scale);
  let newScale: ThemeScaleObject = {};

  for (const [key] of cssVariables) {
    const scaleKeys = key.replace(`--${scaleName}-`, '').split('-');

    if (hasMoreKeys(scaleKeys)) {
      newScale = set(newScale, scaleKeys, `var(${key})`);
    }
  }

  return [newScale, cssVariables];
};
