export type Colors = {
  [key: string]: Colors | string;
};

export type TextStyle = {
  fontFamily?: string;
  fontSize: string;
  fontStyle?: 'italic';
  fontWeight: string;
  letterSpacing?: string;
  lineHeight: string;
  textTransform?: 'lowercase' | 'uppercase';
};

export type TextStyles = {
  [key: string]: TextStyle | TextStyles;
};
