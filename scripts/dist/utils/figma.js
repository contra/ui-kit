"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIconData = exports.getIconComponentName = exports.getComponentVariantNames = exports.isComponentWithVariant = exports.getNodeTextStyle = exports.getNodeColorStyle = exports.getNodeText = exports.getNodeColor = exports.getPaintColorValue = exports.convertRGBValueToHex = exports.convertRGBValue = exports.normalizeStyleKey = exports.isTextNode = exports.isRectangleNode = exports.isComponentNode = exports.filterStyleMetadata = exports.getTeamStyles = exports.getFileComponents = exports.handleFigmaAxiosClientError = exports.downloadFigmaAssets = void 0;
const tslib_1 = require("tslib");
const camelcase_1 = tslib_1.__importDefault(require("camelcase"));
const got_1 = tslib_1.__importDefault(require("got"));
const lodash_1 = require("lodash");
const p_limit_1 = tslib_1.__importDefault(require("p-limit"));
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
const downloadFigmaAssets = (assets) => {
    const limit = p_limit_1.default(30);
    return Promise.all(assets.map(([nodeId, assetUrl]) => {
        return limit(async () => {
            try {
                const { body: svg } = await got_1.default.get(assetUrl, {
                    headers: { 'Content-Type': 'images/svg+xml' },
                });
                const result = [nodeId, svg];
                return result;
            }
            catch (error) {
                // eslint-disable-next-line no-console
                console.log('Error downloading file');
                throw error;
            }
        });
    }));
};
exports.downloadFigmaAssets = downloadFigmaAssets;
const handleFigmaAxiosClientError = (error) => {
    throw new Error(error.message);
};
exports.handleFigmaAxiosClientError = handleFigmaAxiosClientError;
const getFileComponents = async (client, fileId) => {
    const fileComponents = await client.fileComponents(fileId);
    return fileComponents.data.meta.components;
};
exports.getFileComponents = getFileComponents;
const getTeamStyles = async (client, teamId) => {
    const styles = [];
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
            }
            else {
                after = 0;
                hasMoreStyles = false;
            }
            if (meta.styles) {
                styles.push(...meta.styles);
            }
        }
        catch (error) {
            exports.handleFigmaAxiosClientError(error);
            break;
        }
    }
    return styles;
};
exports.getTeamStyles = getTeamStyles;
const filterStyleMetadata = (styleType, fileId) => (style) => {
    const matchFile = fileId ? style.file_key === fileId : true;
    return matchFile && style.style_type === styleType;
};
exports.filterStyleMetadata = filterStyleMetadata;
const isComponentNode = (node) => {
    if (node && node.type === 'COMPONENT')
        return true;
    return false;
};
exports.isComponentNode = isComponentNode;
const isRectangleNode = (node) => {
    if (node && node.type === 'RECTANGLE')
        return true;
    return false;
};
exports.isRectangleNode = isRectangleNode;
const isTextNode = (node) => {
    if (node && node.type === 'TEXT')
        return true;
    return false;
};
exports.isTextNode = isTextNode;
const normalizeStyleKey = (key) => {
    return key.split('/').map((part, index) => {
        const name = camelcase_1.default(part.toLowerCase());
        if (/^\d/.test(name)) {
            return `${camelcase_1.default((key.split('/')[index - 1] ?? '').toLowerCase())}${name}`;
        }
        return name;
    });
};
exports.normalizeStyleKey = normalizeStyleKey;
const convertRGBValue = (value) => {
    return Number((value * 255).toFixed(0));
};
exports.convertRGBValue = convertRGBValue;
const convertRGBValueToHex = (value) => {
    return value.toString(16).padStart(2, '0').toLowerCase();
};
exports.convertRGBValueToHex = convertRGBValueToHex;
const getPaintColorValue = (color, opacity) => {
    const rgb = {
        /* eslint-disable id-length */
        b: exports.convertRGBValue(color.b),
        g: exports.convertRGBValue(color.g),
        r: exports.convertRGBValue(color.r),
        /* eslint-enable id-length */
    };
    const alpha = opacity
        ? Number(opacity.toFixed(2))
        : Number(color.a.toFixed(2));
    if (alpha === 1) {
        // Solid alpha, return hex.
        return `#${exports.convertRGBValueToHex(rgb.r)}${exports.convertRGBValueToHex(rgb.g)}${exports.convertRGBValueToHex(rgb.b)}`;
    }
    // Return rgba
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
};
exports.getPaintColorValue = getPaintColorValue;
const isFontFamilyInMap = (fontFamily) => {
    return FONT_FAMILY_MAP.hasOwnProperty(fontFamily);
};
const mapFigmaFontFamilyToCSSVariable = (fontFamily) => {
    if (isFontFamilyInMap(fontFamily)) {
        return FONT_FAMILY_MAP[fontFamily];
    }
    throw new Error(`Unsupported font family '${fontFamily}'. Does this need added to the map or updated in Figma?`);
};
const getNodeColor = (node) => {
    const { fills } = node;
    const paint = fills[0];
    // TODO: Check that `blendMode` is normal?
    if (paint && paint.type === 'SOLID' && paint.color) {
        return exports.getPaintColorValue(paint.color, paint.opacity);
    }
    return null;
};
exports.getNodeColor = getNodeColor;
const getNodeText = (node) => {
    const { fontFamily, fontSize, fontWeight, italic, letterSpacing, lineHeightPercentFontSize, textCase, } = node.style;
    const mappedFontFamily = mapFigmaFontFamilyToCSSVariable(fontFamily);
    const textStyle = {
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
        }
        else if (textCase === 'UPPER') {
            textStyle.textTransform = 'uppercase';
        }
    }
    return textStyle;
};
exports.getNodeText = getNodeText;
const getNodeColorStyle = (node, colors) => {
    const normalizedKeys = exports.normalizeStyleKey(node.name);
    const colorValue = exports.getNodeColor(node);
    if (colorValue) {
        return lodash_1.set(colors, normalizedKeys, colorValue);
    }
    return colors;
};
exports.getNodeColorStyle = getNodeColorStyle;
const getNodeTextStyle = (node, textStyles) => {
    const normalizedKeys = exports.normalizeStyleKey(node.name);
    const textValue = exports.getNodeText(node);
    return lodash_1.set(textStyles, normalizedKeys, textValue);
};
exports.getNodeTextStyle = getNodeTextStyle;
const isIconData = (data) => {
    if (data === null)
        return false;
    return true;
};
const isComponentWithVariant = (component) => {
    if (component.containing_frame.hasOwnProperty('containingStateGroup'))
        return true;
    return false;
};
exports.isComponentWithVariant = isComponentWithVariant;
const isNotNull = (value) => {
    return value !== null;
};
const getComponentVariantNames = (component) => {
    return component.name
        .split(', ')
        .map((variant) => variant.split('=')[1] ?? null)
        .filter(isNotNull);
};
exports.getComponentVariantNames = getComponentVariantNames;
const getIconComponentName = (component) => {
    if (exports.isComponentWithVariant(component))
        return [
            component.containing_frame.containingStateGroup.name,
            ...exports.getComponentVariantNames(component),
        ].join('/');
    return component.name;
};
exports.getIconComponentName = getIconComponentName;
const generateIconData = (components, downloadedAssets) => {
    return downloadedAssets
        .map(([nodeId, svg]) => {
        const componentData = components.find((component) => {
            return component.node_id === nodeId;
        });
        if (componentData) {
            const name = exports.getIconComponentName(componentData);
            const { description } = componentData;
            const data = {
                componentName: `${name
                    // First replace all unsupported characters
                    .replace(/[^\d/A-Z_-\sa-z]+/g, '')
                    .replace(/^icon\//, '')
                    .split(/[./_-\s]/)
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
exports.generateIconData = generateIconData;
