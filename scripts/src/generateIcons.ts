/* eslint-disable no-console */
import * as path from 'path';
// import * as util from 'util';
import type { TemplateFunc } from '@svgr/core';
import svgr from '@svgr/core';
import * as Figma from 'figma-js';
import * as fs from 'fs-extra';
import prettier from 'prettier';
import type { FigmaAssets } from './types';
import {
  downloadFigmaAssets,
  generateIconData,
  getFileComponents,
  getIconComponentName,
} from './utils/figma';

// eslint rule doesn't mix with `noPropertyAccessFromIndexSignature` yet.
// https://github.com/typescript-eslint/typescript-eslint/issues/3104
// eslint-disable-next-line @typescript-eslint/dot-notation
const ACCESS_TOKEN = process.env['FIGMA_ACCESS_TOKEN'] ?? '';
const FILE_ID = 'L8Te5meCiyl4s3qkbYLpYN';
const OUTPUT_DIR = '../../src/icons/';
const OUTPUT_PATH = path.resolve(__dirname, OUTPUT_DIR);
const INDEX_PATH = path.resolve(OUTPUT_PATH, 'index.ts');
const REPLACE_COLOR = '#131313';

const iconTemplate: TemplateFunc = (
  { template },
  _options,
  { componentName, jsx }
) => {
  // @ts-expect-error - Need more typing
  const typeScriptTpl = template.smart({ plugins: ['jsx', 'typescript'] });

  return typeScriptTpl.ast`/* Generated file. Do not modify. */
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

    const fileComponents = await getFileComponents(client, FILE_ID);

    const iconComponents = fileComponents
      .filter((component) => {
        const componentName = getIconComponentName(component);

        return (
          componentName.startsWith('icon/') &&
          component.containing_frame.name === 'Icons'
        );
      })
      .sort((a, b) => {
        const aComponentName = getIconComponentName(a);
        const bComponentName = getIconComponentName(b);

        return aComponentName.localeCompare(bComponentName);
      });

    // Get icon svg images
    console.log('🔠 Getting list of SVG assets to download');
    const ids = iconComponents.map((component) => {
      return component.node_id;
    });

    const images = await client.fileImages(FILE_ID, { format: 'svg', ids });

    const iconImages: FigmaAssets = Object.entries(images.data.images);

    const downloadedAssets = await downloadFigmaAssets(iconImages);

    const iconData = generateIconData(iconComponents, downloadedAssets);

    // Clear the output directory if it exists.
    if (fs.existsSync(OUTPUT_PATH)) {
      fs.removeSync(OUTPUT_PATH);
    }

    // Creates output directory if non-exist
    fs.mkdirSync(OUTPUT_PATH);

    // Create the index file.
    fs.writeFileSync(
      INDEX_PATH,
      `// Generated at ${new Date().toUTCString()}\n`,
      'utf-8'
    );

    // Create a file for each icon.
    console.log('⚙️ Generating React icons...');
    let generatedCount = 0;
    for (const icon of iconData) {
      try {
        const code: string = await svgr(
          icon.svg,
          {
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
          },
          { componentName: icon.componentName }
        );

        // Write icon file.
        fs.writeFileSync(
          path.resolve(OUTPUT_PATH, `${icon.componentName}.tsx`),
          code,
          'utf-8'
        );

        // Add icon to index
        fs.appendFileSync(
          INDEX_PATH,
          `export { ${icon.componentName} } from './${icon.componentName}';\n`,
          'utf-8'
        );

        console.log(`• Generated ${icon.componentName}`);
        generatedCount += 1;
      } catch (error) {
        console.log(`Unable to generate icon for '${icon.componentName}'`);
        console.log(error);
      }
    }

    // Prettier the index.ts file.
    fs.writeFileSync(
      INDEX_PATH,
      prettier.format(fs.readFileSync(INDEX_PATH, 'utf-8'), {
        parser: 'typescript',
        singleQuote: true,
      }),
      'utf-8'
    );

    console.log(`✅ Generated ${generatedCount} icons!`);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
