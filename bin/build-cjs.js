#!/usr/bin/env node
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const sharedConfig = {
  entryPoints: ['./src/index.ts'],
  platform: 'node',
  sourcemap: true,
  bundle: true,
  external: [
    'react',
    'react-dom',
    '@stitches/react',
    'react-aria',
    'react-stately',
    'gsap',
  ],
  target: ['node12'],
  inject: ['./bin/util/react-shim.js'],
};

const indexContent = `'use strict'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ui-kit.cjs.production.min.js')
} else {
  module.exports = require('./ui-kit.cjs.development.js')
}
`;

const main = () => {
  esbuild.buildSync({
    ...sharedConfig,
    outfile: './dist/cjs/ui-kit.cjs.production.min.js',
    minify: true,
  });

  esbuild.buildSync({
    ...sharedConfig,
    outfile: './dist/cjs/ui-kit.cjs.development.js',
  });

  fs.writeFileSync(
    path.resolve(__dirname, '../dist/cjs', 'index.js'),
    indexContent
  );

  process.exit(0);
};

main();
