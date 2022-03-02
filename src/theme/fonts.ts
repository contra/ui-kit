import { fontStack, generateThemeScaleCssVariables } from './utils';

export const fontStacks = {
  body: fontStack([
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
  ]),
  headline: fontStack([
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
    'Apple Color Emoji',
    'Segoe UI Emoji',
  ]),
  mono: fontStack([
    'IBM Plex Mono',
    'SFMono-Regular',
    'Consolas',
    'Liberation Mono',
    'Menlo',
    'Courier',
    'monospace',
  ]),
  signature: fontStack(['Handlee', 'cursive']),
};

const [fonts, fontCssVariables] = generateThemeScaleCssVariables(
  'font',
  fontStacks
);

export { fonts, fontCssVariables };
