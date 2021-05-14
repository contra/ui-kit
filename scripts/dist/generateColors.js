"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
const util = tslib_1.__importStar(require("util"));
const Figma = tslib_1.__importStar(require("figma-js"));
const prettier_1 = tslib_1.__importDefault(require("prettier"));
const figma_1 = require("./utils/figma");
// eslint rule doesn't mix with `noPropertyAccessFromIndexSignature` yet.
// https://github.com/typescript-eslint/typescript-eslint/issues/3104
// eslint-disable-next-line @typescript-eslint/dot-notation
const ACCESS_TOKEN = process.env['FIGMA_ACCESS_TOKEN'] ?? '';
const TEAM_ID = '752659572481085163';
const FILE_ID = 'L8Te5meCiyl4s3qkbYLpYN';
const OUTPUT_DIR = '../src/primitives/';
const FILE_NAME = 'colors.ts';
const OUTPUT_FILE = path.resolve(__dirname, OUTPUT_DIR, FILE_NAME);
(async () => {
    const client = Figma.Client({
        personalAccessToken: ACCESS_TOKEN,
    });
    try {
        const teamStyles = await figma_1.getTeamStyles(client, TEAM_ID);
        const colorStyles = teamStyles.filter(figma_1.filterStyleMetadata('FILL', FILE_ID));
        const files = new Map();
        colorStyles
            .sort((a, b) => {
            return a.name.localeCompare(b.name);
        })
            .forEach((style) => {
            files.set(style.file_key, [
                ...(files.get(style.file_key) ?? []),
                style,
            ]);
        });
        let colors = {};
        for (const [fileId, styleNodes] of files) {
            const ids = styleNodes.map((style) => style.node_id);
            const fileNodes = await client.fileNodes(fileId, { ids });
            const colorNodes = Object.values(fileNodes.data.nodes)
                .map((node) => node?.document)
                .filter(figma_1.isRectangleNode);
            for (const node of colorNodes) {
                colors = figma_1.getNodeColorStyle(node, colors);
            }
        }
        fs.writeFileSync(OUTPUT_FILE, prettier_1.default.format(util.formatWithOptions({ compact: false }, `/* Generated file. Do not update manually! */      
export const colors = %o;`, colors), {
            parser: 'typescript',
            singleQuote: true,
        }), 'utf-8');
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
})();
