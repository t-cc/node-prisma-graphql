// eslint-disable-next-line no-undef
module.exports = {
  '*.{ts,json,yml}': 'prettier --write',
  'src/*.{js,ts,tsx}':
    "eslint --ignore-pattern '!*' --fix --max-warnings=0",
  '*.{ts,tsx}': () => 'swc src --quiet',
};
