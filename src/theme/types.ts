export type BreakpointNames = 'lg' | 'md' | 'sm' | 'xl';

export type Breakpoints = readonly string[] &
  {
    [breakpoint in BreakpointNames]: string;
  };

export type CSSVariables = Array<[cssVariableName: string, value: string]>;

export type ThemeScaleObject = {
  [key: string]: ThemeScaleObject | string;
};
