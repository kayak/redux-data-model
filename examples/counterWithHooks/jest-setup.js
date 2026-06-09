/* eslint-disable import/no-extraneous-dependencies */
require('jsdom-global')();
var enzyme = require('enzyme');
var Adapter = require('@cfaester/enzyme-adapter-react-18').default;

enzyme.configure({ adapter: new Adapter() });
