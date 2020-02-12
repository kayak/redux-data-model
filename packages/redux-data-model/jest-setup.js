/* eslint-disable import/no-extraneous-dependencies */
require('jsdom-global')();
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

window.console.log = () => {};
window.console.info = () => {};
window.console.warn = () => {};
window.console.error = () => {};
