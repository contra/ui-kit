"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable no-console */
const path = (0, tslib_1.__importStar)(require("path"));
const core_1 = (0, tslib_1.__importDefault)(require("@svgr/core"));
const Figma = (0, tslib_1.__importStar)(require("figma-js"));
const fs = (0, tslib_1.__importStar)(require("fs-extra"));
const prettier_1 = (0, tslib_1.__importDefault)(require("prettier"));
const figma_1 = require("./utils/figma");
const ACCESS_TOKEN = process.env['FIGMA_ACCESS_TOKEN'] ?? '';
const FILE_ID = 'owwo3mjL0dCKJijKGaf1XB';
const OUTPUT_DIR = '../../src/icons/';
const OUTPUT_PATH = path.resolve(__dirname, OUTPUT_DIR);
const INDEX_PATH = path.resolve(OUTPUT_PATH, 'index.ts');
const REPLACE_COLOR = '#131313';
const iconTemplate = ({ template }, _options, { componentName, jsx }) => {
    // @ts-expect-error - Need more typing
    const typeScriptTpl = template.smart({ plugins: ['jsx', 'typescript'] });
    return typeScriptTpl.ast `/* Generated file. Do not modify. */
import type { SVGProps } from 'react';

export const ${componentName} = (props: SVGProps<SVGSVGElement>) => ${jsx};

`;
};
(async () => {
    const client = Figma.Client({
        personalAccessToken: ACCESS_TOKEN,
    });
    try {
        // Fetch team components
        console.log('💅 Fetching file components');
        const fileComponents = await (0, figma_1.getFileComponents)(client, FILE_ID);
        const iconComponents = fileComponents
            .filter((component) => {
            const componentName = (0, figma_1.getIconComponentName)(component);
            // Look only for components that start with `##px/` or `social/` in the `Icons` and `Social Icons` frames.
            return ((/^\d{2,3}px\//.test(componentName) ||
                componentName.startsWith('social/')) &&
                (component.containing_frame.name === 'Icons' ||
                    component.containing_frame.name === 'Social Icons'));
        })
            .sort((a, b) => {
            const aComponentName = (0, figma_1.getIconComponentName)(a);
            const bComponentName = (0, figma_1.getIconComponentName)(b);
            return aComponentName.localeCompare(bComponentName);
        });
        // Get icon svg images
        console.log('🔠 Getting list of SVG assets to download');
        const ids = iconComponents.map((component) => {
            return component.node_id;
        });
        const images = await client.fileImages(FILE_ID, { format: 'svg', ids });
        const iconImages = Object.entries(images.data.images);
        const downloadedAssets = await (0, figma_1.downloadFigmaAssets)(iconImages);
        const iconData = (0, figma_1.generateIconData)(iconComponents, downloadedAssets);
        // Clear the output directory if it exists.
        if (fs.existsSync(OUTPUT_PATH)) {
            fs.removeSync(OUTPUT_PATH);
        }
        // Creates output directory if non-exist
        fs.mkdirSync(OUTPUT_PATH);
        // Create the index file.
        fs.writeFileSync(INDEX_PATH, `// Generated at ${new Date().toUTCString()}\n`, 'utf-8');
        // Create a file for each icon.
        console.log('⚙️ Generating React icons...');
        let generatedCount = 0;
        for (const icon of iconData) {
            try {
                const code = await (0, core_1.default)(icon.svg, {
                    // dimensions: false,
                    icon: true,
                    plugins: [
                        '@svgr/plugin-svgo',
                        '@svgr/plugin-jsx',
                        '@svgr/plugin-prettier',
                    ],
                    prettier: true,
                    replaceAttrValues: {
                        [REPLACE_COLOR.toUpperCase()]: 'currentColor',
                    },
                    svgProps: {
                        focusable: 'false',
                        role: 'img',
                    },
                    template: iconTemplate,
                    typescript: true,
                }, { componentName: icon.componentName });
                // Write icon file.
                fs.writeFileSync(path.resolve(OUTPUT_PATH, `${icon.componentName}.tsx`), code, 'utf-8');
                // Add icon to index
                fs.appendFileSync(INDEX_PATH, `export { ${icon.componentName} } from './${icon.componentName}';\n`, 'utf-8');
                console.log(`• Generated ${icon.componentName}`);
                generatedCount += 1;
            }
            catch (error) {
                console.log(`Unable to generate icon for '${icon.componentName}'`);
                console.log(error);
            }
        }
        // Prettier the index.ts file.
        fs.writeFileSync(INDEX_PATH, prettier_1.default.format(fs.readFileSync(INDEX_PATH, 'utf-8'), {
            parser: 'typescript',
            singleQuote: true,
        }), 'utf-8');
        console.log(`✅ Generated ${generatedCount} icons!`);
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
