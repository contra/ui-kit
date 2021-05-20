import type { FrameInfo, FullComponentMetadata } from 'figma-js';

export type Colors = {
  [key: string]: Colors | string;
};

export type FigmaAssets = Array<[nodeId: string, assetUrl: string]>;

// Custom type since figma-js doesn't know about variants yet.
export type FullComponentMetadataWithVariant = FullComponentMetadata & {
  containing_frame: FrameInfo & {
    containingStateGroup: {
      name: string;
      nodeId: string;
    };
  };
};

export type IconData = {
  componentName: string;
  figmaName: string;
  keywords: string[];
  nodeId: string;
  svg: string;
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
