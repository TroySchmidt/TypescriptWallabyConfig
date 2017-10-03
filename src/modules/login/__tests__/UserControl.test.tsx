import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'semantic-ui-react';
import { UserControl } from '../components/UserControl';

describe('User control rendering', () => {
  const onLogout = jest.fn();
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <UserControl onLogout={onLogout} />
    );
  });

  it('1532_displays logout', () => {
    expect(wrapper.find(Button).length).toEqual(1);
  });
});