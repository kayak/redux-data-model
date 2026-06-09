const pkg = require('./package.json');
const baseConfig = require('../../rollup.config.js');

module.exports = baseConfig({}, pkg);
