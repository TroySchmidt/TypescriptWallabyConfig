import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';
import { App } from '../components/App';

describe('App tests', () => {
  it('1532-renders without crashing', () => {
    const wrapper = shallow(<App onLogout={jest.fn()} />);
    expect(wrapper).not.toBeFalsy();
  });
});
