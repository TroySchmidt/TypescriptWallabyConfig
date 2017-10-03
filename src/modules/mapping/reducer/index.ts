import { combineReducers } from 'redux';
import basemaps, { BasemapsState, fromBasemaps } from './basemaps';
import ui, { UIState, fromUI } from './ui';
import { AppState } from '../../reducers';

export interface MappingState {
  basemaps: BasemapsState;
  ui: UIState;
}

const reducer = combineReducers({
  basemaps,
  ui,
});

export default reducer;
export const getIsBasemapVisible = (state: AppState) =>
  fromBasemaps.getIsVisible(state.mapping.basemaps);

export const getIsBasemapExpanded = (state: AppState) =>
  fromBasemaps.getIsExpanded(state.mapping.basemaps);

export const getBasemapSelected = (state: AppState) =>
  fromBasemaps.getSelectedBasemap(state.mapping.basemaps);

export const getBasemapLabelsSelected = (state: AppState) =>
  fromBasemaps.getSelectedBasemapLabels(state.mapping.basemaps);

export const getMapScale = (state: AppState) => fromUI.getMapScale(state.mapping.ui);

export const mapSelectors = {
  getIsBasemapVisible,
  getIsBasemapExpanded,
  getBasemapSelected,
  getBasemapLabelsSelected,
  getMapScale,
};