/* eslint-disable import/no-extraneous-dependencies */
import 'jsdom-global/register'; // at the top of file, even before importing react
import {configure} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
configure({adapter: new Adapter()});
