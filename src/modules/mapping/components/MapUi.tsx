import * as React from 'react';
import { connect } from 'react-redux';
import { Map, ZoomControl } from 'react-leaflet';
import * as L from 'leaflet';
import * as Actions from '../actions';
import { mapSelectors } from '../reducer';

const esri: typeof L.esri = require('esri-leaflet');

interface StateProps {
  basemapVisible: boolean;
  basemapSelected: string;
  basemapLabels: string;
}

interface DispatchProps {
  onMapScaleChanged: typeof Actions.mapScaleChanged;
}

export class MapUi extends React.PureComponent<StateProps & DispatchProps, {}> {
  map: L.Map;
  basemapLayer: L.esri.BasemapLayer;
  basemapLabelLayer: L.esri.BasemapLayer;

  componentDidMount() {
    // tslint:disable-next-line:no-string-literal
    this.map = this.refs.map['leafletElement'];
    const { basemapSelected, basemapLabels, basemapVisible } = this.props;
    // Add esri layers to the map
    
    this.updateBasemaps(basemapSelected as L.esri.Basemaps, basemapLabels as L.esri.Basemaps, basemapVisible);
    this.updateMapScale();
  }

  componentWillUpdate(nextProps: StateProps & DispatchProps) {
    
    const { basemapSelected, basemapVisible, basemapLabels } = nextProps;

    if (basemapSelected !== this.props.basemapSelected) {
      this.updateBasemaps(basemapSelected as L.esri.Basemaps, basemapLabels as L.esri.Basemaps, basemapVisible);
    }

    if (basemapVisible !== this.props.basemapVisible) {
      if (!basemapVisible) {
        this.basemapLayer.setOpacity(0);
        this.basemapLabelLayer.setOpacity(0);
      } else {
        this.basemapLayer.setOpacity(1);
        this.basemapLabelLayer.setOpacity(1);
      }
    }
  }

  onZoomEnd = (e: L.LeafletEvent) => {
    // There is glitch on when the events are updated.  Maybe delay trigger?
    this.updateMapScale();
  }

  updateMapScale = () => {
    const bounds = this.map.getBounds();
    const pixelBounds = this.map.getSize();
    const measuredWidth = this.map.distance(bounds.getSouthEast(), bounds.getSouthWest());
    // 24,859.82 miles in circumference of Earth.
    const metersPerPixel = 24859.82 * 5280 / .3048 * Math.abs(Math.cos(this.map.getCenter().lat * 180 / Math.PI)) 
                            / Math.pow(2, this.map.getZoom() + 8);
    const { onMapScaleChanged } = this.props;
    onMapScaleChanged(measuredWidth / pixelBounds.x * metersPerPixel);
  }

  updateBasemaps = (selected: L.esri.Basemaps, labels: L.esri.Basemaps, visible: boolean) => {
    if (this.basemapLayer) {
      this.basemapLayer.remove();
    }
    this.basemapLayer = esri.basemapLayer(selected);
    this.basemapLayer.addTo(this.map);
    
    if (!visible) {
      this.basemapLayer.setOpacity(0);
    }
    if (labels as string !== 'StreetsLabels') {
      if (this.basemapLabelLayer) {
        this.basemapLabelLayer.remove();
      }
      this.basemapLabelLayer = esri.basemapLayer(labels);
      this.basemapLabelLayer.addTo(this.map);
      if (!visible) {
        this.basemapLabelLayer.setOpacity(0);
      }
    }
  }

  render() {
    return (
      <Map
        ref="map" // tslint:disable-line
        center={[39.5, -96]}
        zoom={4}
        zoomControl={false}
        onzoomend={this.onZoomEnd}
        attributionControl={true}
        style={{height: '100%', width: '100%'}}
      >
      <ZoomControl position="topright"/>
      {this.props.children}
      </Map>
    );
  }
}

/* ignore codecoverage */
export default connect((state) => ({
  basemapVisible: mapSelectors.getIsBasemapVisible(state),
  basemapSelected: mapSelectors.getBasemapSelected(state),
  basemapLabels: mapSelectors.getBasemapLabelsSelected(state),
}),
{
  onMapScaleChanged: Actions.mapScaleChanged,
})(MapUi);