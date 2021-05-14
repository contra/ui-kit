const { ESLint } = require('eslint');

const eslintCli = new ESLint();

const filterAsync = async (array, callback) => {
  const results = await Promise.all(
    array.map(async (value, index) => {
      const result = await callback(value, index);

      return result;
    })
  );

  return array.filter((_, i) => results[i]);
};

const removeIgnoredFiles = async (files) => {
  const filteredFiles = await filterAsync(files, async (file) => {
    const isIgnored = await eslintCli.isPathIgnored(file);

    return !isIgnored;
  });

  return filteredFiles.join(' ');
};

module.exports = {
  '*.{js,jsx,ts,tsx,md,html,css}': 'prettier --write',
  '*.{js,jsx,ts,tsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files);

    return [`eslint --quiet --fix ${filesToLint}`];
  },
};
