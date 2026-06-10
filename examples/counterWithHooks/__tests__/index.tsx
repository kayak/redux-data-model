import * as React from "react";
import IndexPage from '../pages/index';
import {fireEvent, render, screen} from '@testing-library/react';
import {Model} from 'redux-data-model';

describe('IndexPage', () => {
  let container: HTMLElement;
  let asFragment: () => DocumentFragment;

  beforeEach(() => {
    Model.disableProxyChecks = true;
    ({container, asFragment} = render(<IndexPage />));
  });

  afterEach(() => {
    Model.disableProxyChecks = false;
  });

  it('renders two buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('matches snapshot', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it('starts with counter value as 0', () => {
    expect(container.querySelector('#counterValue')?.textContent).toEqual('0')
  });

  it('changes counter value to 1 when incremented', () => {
    fireEvent.click(container.querySelector('#incrementButton') as Element);
    expect(
      container.querySelector('#counterValue')?.textContent
    ).toEqual('1')
    fireEvent.click(container.querySelector('#decrementButton') as Element);
  });

  it('changes counter value to -1 when decremented', () => {
    fireEvent.click(container.querySelector('#decrementButton') as Element);

    expect(
      container.querySelector('#counterValue')?.textContent
    ).toEqual('-1');
    fireEvent.click(container.querySelector('#incrementButton') as Element);
  });
});
