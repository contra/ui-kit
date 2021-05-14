import type { AxiosError } from 'axios';
import camelCase from 'camelcase';
import type {
  ClientInterface,
  Color,
  FullStyleMetadata,
  Node,
  Rectangle,
  StyleType,
} from 'figma-js';
import { set } from 'lodash';
import type { Colors } from '../types';

export const handleFigmaAxiosClientError = (error: AxiosError) => {
  throw new Error(error.message);
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

      // @ts-expect-error - typing is incorrect see https://github.com/jongold/figma-js/pull/51
      if (meta.cursor.after) {
        // @ts-expect-error - typing is incorrect see https://github.com/jongold/figma-js/pull/51
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

export const isRectangleNode = (
  node: Node | null | undefined
): node is Rectangle => {
  if (node && node.type === 'RECTANGLE') return true;

  return false;
};

export const normalizeColorKey = (key: string): string[] => {
  return key.split('/').map((part, index) => {
    const name = camelCase(part.toLowerCase());

    if (/^\d/.test(name)) {
      return `${camelCase(
        (key.split('/')[index - 1] ?? '').toLowerCase()
      )}${name}`;
    }

    return name;
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

export const getNodeColor = (node: Rectangle): string | null => {
  const { fills } = node;

  const paint = fills[0];
  // TODO: Check that `blendMode` is normal?
  if (paint && paint.type === 'SOLID' && paint.color) {
    return getPaintColorValue(paint.color, paint.opacity);
  }

  return null;
};

export const getNodeColorStyle = (node: Rectangle, colors: Colors): Colors => {
  const normalizedKeys = normalizeColorKey(node.name);
  const colorValue = getNodeColor(node);

  if (colorValue) {
    return set(colors, normalizedKeys, colorValue);
  }

  return colors;
};
