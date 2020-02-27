import * as React from "react";
import IndexPage from '../pages/index';
import {mount} from 'enzyme'

describe('IndexPage', () => {
  let page = null;

  beforeEach(() => {
    page = mount(<IndexPage />);
  });

  it('matches snapshot', () => {
    expect(page).toMatchSnapshot();
  });
});
