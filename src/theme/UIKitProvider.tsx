import type { ReactNode } from 'react';
import { useMemo } from 'react';
import {
  defaultUIKitThemeContext,
  UIKitThemeContext,
} from './UIKitThemeContext';
// import type { CreateTheme } from './types';

type UIKitProviderProps = {
  children: ReactNode;
  // theme?: CreateTheme;
};

export const UIKitProvider = ({
  children,
}: UIKitProviderProps): JSX.Element => {
  const uiKitThemeContext = useMemo(
    () =>
      // Will add more logic to this later.
      defaultUIKitThemeContext,
    []
  );

  return (
    <UIKitThemeContext.Provider value={uiKitThemeContext}>
      {children}
    </UIKitThemeContext.Provider>
  );
};
