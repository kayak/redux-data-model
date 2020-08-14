import * as React from "react";
import IndexPage from '../pages/index';
import {mount} from 'enzyme';
import {Model} from 'redux-data-model';

describe('IndexPage', () => {
  let page: any = null;

  beforeEach(() => {
    Model.disableProxyChecks = true;
    page = mount(<IndexPage />);
  });

  afterEach(() => {
    Model.disableProxyChecks = false;
  });

  it('matches snapshot', () => {
    expect(page).toMatchSnapshot();
  });
});
