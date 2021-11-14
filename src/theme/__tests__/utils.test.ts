import type { ThemeScaleObject } from 'theme/types';
import {
  createBreakpoints,
  fontStack,
  generateCSSVariablesMap,
  generateThemeScaleCssVariables,
} from '../utils';

describe('theme utils', () => {
  describe('createBreakpoints', () => {
    it('should create expected breakpoints object', () => {
      const breakpoints = createBreakpoints('10px', '20px', '30px', '40px');

      const expected = ['10px', '20px', '30px', '40px'];

      expect([...breakpoints]).toEqual(expected);
      expect(breakpoints.sm).toBe('10px');
      expect(breakpoints.md).toBe('20px');
      expect(breakpoints.lg).toBe('30px');
      expect(breakpoints.xl).toBe('40px');
    });
  });

  describe('fontStack', () => {
    it('should generated expected string', () => {
      const font = fontStack([
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
      ]);
      const expected =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';

      expect(font).toEqual(expected);
    });
  });

  describe('generateCSSVariablesMap', () => {
    it('should generate map for nested scale object', () => {
      const cssVariables = generateCSSVariablesMap('color', {
        bar: 'bar',
        foo: 'foo',
        fruits: {
          apple: 'apple',
          banana: 'banana',
          veggie: { onion: 'onion', tomato: 'tomato' },
        },
        someOtherKey: 'camelcase',
      });

      expect(cssVariables).toEqual([
        ['--color-bar', 'bar'],
        ['--color-foo', 'foo'],
        ['--color-fruits-apple', 'apple'],
        ['--color-fruits-banana', 'banana'],
        ['--color-fruits-veggie-onion', 'onion'],
        ['--color-fruits-veggie-tomato', 'tomato'],
        ['--color-someOtherKey', 'camelcase'],
      ]);
    });
  });

  describe('generateThemeScaleCssVariables', () => {
    it('should generate proper updated scale object and cssVars', () => {
      const originalColors: ThemeScaleObject = {
        social: {
          invision: '#dc395f',
          react: '#53c1de',
          twitter: '#4aa1eb',
        },
        ui: {
          black: {
            disabled: 'rgba(19,19,19,0.4)',
            highEmphasis: '#131313',
            mediumEmphasis: 'rgba(19,19,19,0.67)',
          },
          error: {
            focus: '#ce0e19',
            regular: '#e90f1c',
          },
          selected: '#dfeaf9',
        },
      };

      const [colors, cssVariables] = generateThemeScaleCssVariables(
        'color',
        originalColors
      );

      expect(colors).toEqual({
        social: {
          invision: 'var(--color-social-invision)',
          react: 'var(--color-social-react)',
          twitter: 'var(--color-social-twitter)',
        },
        ui: {
          black: {
            disabled: 'var(--color-ui-black-disabled)',
            highEmphasis: 'var(--color-ui-black-highEmphasis)',
            mediumEmphasis: 'var(--color-ui-black-mediumEmphasis)',
          },
          error: {
            focus: 'var(--color-ui-error-focus)',
            regular: 'var(--color-ui-error-regular)',
          },
          selected: 'var(--color-ui-selected)',
        },
      });

      expect(cssVariables).toEqual([
        ['--color-social-invision', '#dc395f'],
        ['--color-social-react', '#53c1de'],
        ['--color-social-twitter', '#4aa1eb'],
        ['--color-ui-black-disabled', 'rgba(19,19,19,0.4)'],
        ['--color-ui-black-highEmphasis', '#131313'],
        ['--color-ui-black-mediumEmphasis', 'rgba(19,19,19,0.67)'],
        ['--color-ui-error-focus', '#ce0e19'],
        ['--color-ui-error-regular', '#e90f1c'],
        ['--color-ui-selected', '#dfeaf9'],
      ]);
    });
  });
});
