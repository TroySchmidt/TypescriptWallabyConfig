import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';
import { Menu } from 'semantic-ui-react';
import { Sidebar } from '../components/Sidebar';

describe('Sidebar control rendering', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Sidebar />
    );
  });

  it('1532_displays menu', () => {
    expect(wrapper.find(Menu).length).toEqual(1);
  });
});