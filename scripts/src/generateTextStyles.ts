/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as Figma from 'figma-js';
import prettier from 'prettier';
import type { TextStyles } from './types';
import {
  filterStyleMetadata,
  getNodeTextStyle,
  getTeamStyles,
  isTextNode,
} from './utils/figma';

// eslint rule doesn't mix with `noPropertyAccessFromIndexSignature` yet.
// https://github.com/typescript-eslint/typescript-eslint/issues/3104
// eslint-disable-next-line @typescript-eslint/dot-notation
const ACCESS_TOKEN = process.env['FIGMA_ACCESS_TOKEN'] ?? '';
const TEAM_ID = '752659572481085163';
const FILE_ID = 'L8Te5meCiyl4s3qkbYLpYN';
const OUTPUT_DIR = '../../src/primitives/';
const FILE_NAME = 'textStyles.ts';
const OUTPUT_FILE = path.resolve(__dirname, OUTPUT_DIR, FILE_NAME);

(async () => {
  const client = Figma.Client({
    personalAccessToken: ACCESS_TOKEN,
  });

  try {
    // Fetch team styles
    console.log('💅 Fetching team styles');

    const teamStyles = await getTeamStyles(client, TEAM_ID);

    const filteredTextStyles = teamStyles.filter(
      filterStyleMetadata('TEXT', FILE_ID)
    );

    const files: Map<string, Figma.FullStyleMetadata[]> = new Map();

    filteredTextStyles
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
      .forEach((style) => {
        files.set(style.file_key, [
          ...(files.get(style.file_key) ?? []),
          style,
        ]);
      });

    let textStyles: TextStyles = {};

    // Get color styles out of team styles.
    console.log('🔠 Getting team text styles');
    for (const [fileId, styleNodes] of files) {
      const ids = styleNodes.map((style) => style.node_id);
      const fileNodes = await client.fileNodes(fileId, { ids });

      const nodes = Object.values(fileNodes.data.nodes)
        .map((node) => node?.document)
        .filter(isTextNode);

      for (const node of nodes) {
        textStyles = getNodeTextStyle(node, textStyles);
      }
    }

    // Fetch team styles
    console.log(`💾 Saving text styles to ${FILE_NAME}`);
    fs.writeFileSync(
      OUTPUT_FILE,
      prettier.format(
        util.formatWithOptions(
          { compact: false },
          `/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

/* Generated file. Do not update manually! */      
export const textStyles = %o;`,
          textStyles
        ),
        {
          parser: 'typescript',
          singleQuote: true,
        }
      ),
      'utf-8'
    );

    console.log('✅ Text styles file generated!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
