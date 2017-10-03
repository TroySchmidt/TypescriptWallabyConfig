import 'jsdom-global/register';
import * as React from 'react';
import { shallow } from 'enzyme';
// import { Button } from 'semantic-ui-react';
import { MapUi } from '../components/MapUi';

describe('User control rendering', () => {
  let wrapper;
  const mapScaleChanged = jest.fn();

  beforeAll(() => {
    wrapper = shallow(
      <MapUi 
        basemapVisible={true}
        basemapSelected="Imagery"
        basemapLabels="ImageryLabels"
        onMapScaleChanged={mapScaleChanged} 
      />
    );
  });

  it('1532_displays', () => {
    expect(wrapper).not.toBeFalsy();
  });
});