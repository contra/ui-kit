import { createContext } from 'react';
import { theme } from './stitches.config';
import type { UIKitThemeContextProps } from './types';

export const defaultUIKitThemeContext: UIKitThemeContextProps = {
  isDark: false,
  theme,
  type: 'light',
};

export const UIKitThemeContext = createContext<UIKitThemeContextProps>(
  defaultUIKitThemeContext
);
