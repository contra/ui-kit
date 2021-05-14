"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNodeColorStyle = exports.getNodeColor = exports.getPaintColorValue = exports.convertRGBValueToHex = exports.convertRGBValue = exports.normalizeColorKey = exports.isRectangleNode = exports.filterStyleMetadata = exports.getTeamStyles = exports.handleFigmaAxiosClientError = void 0;
const tslib_1 = require("tslib");
const camelcase_1 = tslib_1.__importDefault(require("camelcase"));
const lodash_1 = require("lodash");
const handleFigmaAxiosClientError = (error) => {
    throw new Error(error.message);
};
exports.handleFigmaAxiosClientError = handleFigmaAxiosClientError;
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
const isRectangleNode = (node) => {
    if (node && node.type === 'RECTANGLE')
        return true;
    return false;
};
exports.isRectangleNode = isRectangleNode;
const normalizeColorKey = (key) => {
    return key.split('/').map((part, index) => {
        const name = camelcase_1.default(part.toLowerCase());
        if (/^\d/.test(name)) {
            return `${camelcase_1.default((key.split('/')[index - 1] ?? '').toLowerCase())}${name}`;
        }
        return name;
    });
};
exports.normalizeColorKey = normalizeColorKey;
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
const getNodeColorStyle = (node, colors) => {
    const normalizedKeys = exports.normalizeColorKey(node.name);
    const colorValue = exports.getNodeColor(node);
    if (colorValue) {
        return lodash_1.set(colors, normalizedKeys, colorValue);
    }
    return colors;
};
exports.getNodeColorStyle = getNodeColorStyle;
