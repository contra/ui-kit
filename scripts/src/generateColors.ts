import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import * as Figma from 'figma-js';
import prettier from 'prettier';
import type { Colors } from './types';
import {
  filterStyleMetadata,
  getNodeColorStyle,
  getTeamStyles,
  isRectangleNode,
} from './utils/figma';

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
    const teamStyles = await getTeamStyles(client, TEAM_ID);

    const colorStyles = teamStyles.filter(filterStyleMetadata('FILL', FILE_ID));

    const files: Map<string, Figma.FullStyleMetadata[]> = new Map();

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

    let colors: Colors = {};

    for (const [fileId, styleNodes] of files) {
      const ids = styleNodes.map((style) => style.node_id);
      const fileNodes = await client.fileNodes(fileId, { ids });

      const colorNodes = Object.values(fileNodes.data.nodes)
        .map((node) => node?.document)
        .filter(isRectangleNode);

      for (const node of colorNodes) {
        colors = getNodeColorStyle(node, colors);
      }
    }

    fs.writeFileSync(
      OUTPUT_FILE,
      prettier.format(
        util.formatWithOptions(
          { compact: false },
          `/* Generated file. Do not update manually! */      
export const colors = %o;`,
          colors
        ),
        {
          parser: 'typescript',
          singleQuote: true,
        }
      ),
      'utf-8'
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();
