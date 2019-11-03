/* eslint-disable import/no-extraneous-dependencies */
require('jsdom-global')();
var enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
