/* eslint-disable no-console */
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

const ACCESS_TOKEN = process.env['FIGMA_ACCESS_TOKEN'] ?? '';
const TEAM_ID = '1078370320081672277';
const FILE_ID = 'owwo3mjL0dCKJijKGaf1XB';
const OUTPUT_DIR = '../../src/primitives/';
const FILE_NAME = 'colorPrimitives.ts';
const OUTPUT_FILE = path.resolve(__dirname, OUTPUT_DIR, FILE_NAME);

(async () => {
  const client = Figma.Client({
    personalAccessToken: ACCESS_TOKEN,
  });

  try {
    // Fetch team styles
    console.log('💅 Fetching team styles');

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

    // Get color styles out of team styles.
    console.log('🌈 Getting team color styles');
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

    // Fetch team styles
    console.log(`💾 Saving colors to ${FILE_NAME}`);
    fs.writeFileSync(
      OUTPUT_FILE,
      prettier.format(
        util.formatWithOptions(
          { compact: false },
          `/* eslint-disable */
/* Generated file. Do not update manually! */
     
export const colorPrimitives = %o;`,
          colors
        ),
        {
          parser: 'typescript',
          singleQuote: true,
        }
      ),
      'utf-8'
    );

    console.log('✅ Color file generated!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
