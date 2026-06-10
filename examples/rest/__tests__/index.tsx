import * as React from "react";
import IndexPage from '../pages/index';
import {render} from '@testing-library/react';
import {Model} from 'redux-data-model';

describe('IndexPage', () => {
  let asFragment: () => DocumentFragment;

  beforeEach(() => {
    Model.disableProxyChecks = true;
    ({asFragment} = render(<IndexPage />));
  });

  afterEach(() => {
    Model.disableProxyChecks = false;
  });

  it('matches snapshot', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
