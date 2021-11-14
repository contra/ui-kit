import camelCase from 'camelcase';
import type {
  ClientInterface,
  Color,
  Component,
  FullComponentMetadata,
  FullStyleMetadata,
  Node,
  Rectangle,
  StyleType,
  Text,
} from 'figma-js';
import got from 'got';
import { set } from 'lodash';
import pLimit from 'p-limit';
import type {
  Colors,
  FigmaAssets,
  FullComponentMetadataWithVariant,
  IconData,
  TextStyle,
  TextStyles,
} from '../types';

/**
 * This is used to map `fontFamily` values from Figma `TextStyle`'s to
 * CSS vars so we can cut down on the amount of unnecessary bytes.
 *
 * If generating text styles results in an error about unknown font family
 * we either need to add it to this map, or consult the design team and verify
 * if we are shipping another font family stack.
 *
 * See /src/theme/fonts for font stacks
 */
const FONT_FAMILY_MAP = {
  'IBM Plex Mono': 'var(--font-mono)',
  // Since "Inter" is our base font family and should be set on <body>, no need to explicitly
  // set it in our CSS code per text style.
  Inter: null,
};

export const downloadFigmaAssets = (
  assets: FigmaAssets
): Promise<Array<[nodeId: string, svg: string]>> => {
  const limit = pLimit(30);

  return Promise.all(
    assets.map(([nodeId, assetUrl]) => {
      return limit(async () => {
        try {
          const { body: svg } = await got.get(assetUrl, {
            headers: { 'Content-Type': 'images/svg+xml' },
          });

          const result: [string, string] = [nodeId, svg];

          return result;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log('Error downloading file');
          throw error;
        }
      });
    })
  );
};

export const handleFigmaAxiosClientError = (error: unknown) => {
  throw error;
};

export const getFileComponents = async (
  client: ClientInterface,
  fileId: string
): Promise<readonly FullComponentMetadata[]> => {
  const fileComponents = await client.fileComponents(fileId);

  return fileComponents.data.meta.components;
};

export const getTeamStyles = async (
  client: ClientInterface,
  teamId: string
): Promise<FullStyleMetadata[]> => {
  const styles: FullStyleMetadata[] = [];

  let hasMoreStyles = true;
  let after = 0;

  while (hasMoreStyles) {
    try {
      const teamStyles = await client.teamStyles(teamId, {
        cursor: after ? { after } : undefined,
        page_size: 100,
      });

      const { meta } = teamStyles.data;

      if (meta.cursor.after) {
        after = meta.cursor.after;
      } else {
        after = 0;
        hasMoreStyles = false;
      }

      if (meta.styles) {
        styles.push(...meta.styles);
      }
    } catch (error) {
      handleFigmaAxiosClientError(error);
      break;
    }
  }

  return styles;
};

export const filterStyleMetadata =
  (styleType: StyleType, fileId?: string) => (style: FullStyleMetadata) => {
    const matchFile: boolean = fileId ? style.file_key === fileId : true;

    return matchFile && style.style_type === styleType;
  };

export const isComponentNode = (
  node: Node | null | undefined
): node is Component => {
  if (node && node.type === 'COMPONENT') return true;

  return false;
};

export const isRectangleNode = (
  node: Node | null | undefined
): node is Rectangle => {
  if (node && node.type === 'RECTANGLE') return true;

  return false;
};

export const isTextNode = (node: Node | null | undefined): node is Text => {
  if (node && node.type === 'TEXT') return true;

  return false;
};

export const normalizeStyleKey = (key: string): string[] => {
  return key.split('/').map((part) => {
    return camelCase(part.toLowerCase());
  });
};

export const convertRGBValue = (value: number): number => {
  return Number((value * 255).toFixed(0));
};

export const convertRGBValueToHex = (value: number): string => {
  return value.toString(16).padStart(2, '0').toLowerCase();
};

export const getPaintColorValue = (
  color: Color,
  opacity: number | undefined
): string => {
  const rgb = {
    /* eslint-disable id-length */
    b: convertRGBValue(color.b),
    g: convertRGBValue(color.g),
    r: convertRGBValue(color.r),
    /* eslint-enable id-length */
  };

  const alpha = opacity
    ? Number(opacity.toFixed(2))
    : Number(color.a.toFixed(2));

  if (alpha === 1) {
    // Solid alpha, return hex.

    return `#${convertRGBValueToHex(rgb.r)}${convertRGBValueToHex(
      rgb.g
    )}${convertRGBValueToHex(rgb.b)}`;
  }

  // Return rgba

  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
};

const isFontFamilyInMap = (
  fontFamily: string
): fontFamily is keyof typeof FONT_FAMILY_MAP => {
  return FONT_FAMILY_MAP.hasOwnProperty(fontFamily);
};

const mapFigmaFontFamilyToCSSVariable = (fontFamily: string): string | null => {
  if (isFontFamilyInMap(fontFamily)) {
    return FONT_FAMILY_MAP[fontFamily];
  }

  throw new Error(
    `Unsupported font family '${fontFamily}'. Does this need added to the map or updated in Figma?`
  );
};

export const getNodeColor = (node: Rectangle): string | null => {
  const { fills } = node;

  const paint = fills[0];
  // TODO: Check that `blendMode` is normal?
  if (paint && paint.type === 'SOLID' && paint.color) {
    return getPaintColorValue(paint.color, paint.opacity);
  }

  return null;
};

export const getNodeText = (node: Text): TextStyle => {
  const {
    fontFamily,
    fontSize,
    fontWeight,
    italic,
    letterSpacing,
    lineHeightPercentFontSize,
    textCase,
  } = node.style;

  const mappedFontFamily = mapFigmaFontFamilyToCSSVariable(fontFamily);

  const textStyle: TextStyle = {
    // TODO: Maybe we want to REM this?
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight.toString(),
    lineHeight: lineHeightPercentFontSize
      ? Number((lineHeightPercentFontSize * 0.01).toFixed(3)).toString()
      : '1',
  };

  if (mappedFontFamily) {
    textStyle.fontFamily = mappedFontFamily;
  }

  if (letterSpacing) {
    textStyle.letterSpacing = `${Number(letterSpacing.toFixed(3))}px`;
  }

  if (italic) {
    textStyle.fontStyle = 'italic';
  }

  if (textCase) {
    if (textCase === 'LOWER') {
      textStyle.textTransform = 'lowercase';
    } else if (textCase === 'UPPER') {
      textStyle.textTransform = 'uppercase';
    }
  }

  return textStyle;
};

export const getNodeColorStyle = (node: Rectangle, colors: Colors): Colors => {
  const normalizedKeyParts = normalizeStyleKey(node.name);
  const colorValue = getNodeColor(node);

  const key = camelCase(normalizedKeyParts);

  if (colorValue) {
    return { ...colors, [key]: colorValue };
  }

  return colors;
};

export const getNodeTextStyle = (
  node: Text,
  textStyles: TextStyles
): TextStyles => {
  const normalizedKeys = normalizeStyleKey(node.name);
  const textValue = getNodeText(node);

  return set(textStyles, normalizedKeys, textValue);
};

const isIconData = (data: IconData | null): data is IconData => {
  if (data === null) return false;

  return true;
};

export const isComponentWithVariant = (
  component: FullComponentMetadata | FullComponentMetadataWithVariant
): component is FullComponentMetadataWithVariant => {
  if (component.containing_frame.hasOwnProperty('containingStateGroup'))
    return true;

  return false;
};

const isNotNull = <T>(value: T | null): value is T => {
  return value !== null;
};

export const getComponentVariantNames = (
  component: FullComponentMetadataWithVariant
): string[] => {
  return component.name
    .split(', ')
    .map((variant) => variant.split('=')[1] ?? null)
    .filter(isNotNull);
};

export const getIconComponentName = (
  component: FullComponentMetadata | FullComponentMetadataWithVariant
): string => {
  if (isComponentWithVariant(component))
    return [
      component.containing_frame.containingStateGroup.name,
      ...getComponentVariantNames(component),
    ].join('/');

  return component.name;
};

export const generateIconData = (
  components: FullComponentMetadata[],
  downloadedAssets: Array<[nodeId: string, svg: string]>
): IconData[] => {
  return downloadedAssets
    .map(([nodeId, svg]) => {
      const componentData = components.find((component) => {
        return component.node_id === nodeId;
      });

      if (componentData) {
        const name = getIconComponentName(componentData);

        const { description } = componentData;

        const data: IconData = {
          componentName: `${name
            // First replace all unsupported characters
            .replace(/[^\d/A-Z_-\sa-z]+/g, '')
            // Replace the sizes
            .replace(/^24px\//, '')
            .replace(/^(\d+px\/)(.+)/, '$2/$1')
            .split(/[./_-\s]/)
            .filter(Boolean)
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('')}Icon`,
          figmaName: name,
          keywords: description
            .trim()
            .split(',')
            .map((keyword) => keyword.trim()),
          nodeId,
          svg,
        };

        return data;
      }

      return null;
    })
    .filter(isIconData);
};
