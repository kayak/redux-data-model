import * as React from "react";
import IndexPage from '../pages/index';
import {mount} from 'enzyme'

describe('IndexPage', () => {
  let page = null;

  beforeEach(() => {
    page = mount(<IndexPage />);
  });

  it('renders two buttons', () => {
    expect(page.find('button')).toHaveLength(2);
  });

  it('matches snapshot', () => {
    expect(page).toMatchSnapshot();
  });

  it('starts with counter value as 0', () => {
    expect(
      page.find('#counterValue').text()
    ).toEqual('0')
  });

  describe('when incremented', () => {
    it('does not really change counter value', () => {
      page.find('#incrementButton').simulate('click');
      expect(
        page.find('#counterValue').text()
      ).toEqual('0');
    });
  });

  describe('when decremented', () => {
    it('does not really change counter value', () => {
      page.find('#decrementButton').simulate('click');
      expect(
        page.find('#counterValue').text()
      ).toEqual('0');
    });
  });
});
