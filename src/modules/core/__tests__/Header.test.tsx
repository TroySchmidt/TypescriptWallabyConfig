import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';
import { Image } from 'semantic-ui-react';
import { Header } from '../components/Header';

describe('Header control rendering', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Header />
    );
  });

  it('1532_displays logo', () => {
    expect(wrapper.find(Image).length).toEqual(1);
  });
});