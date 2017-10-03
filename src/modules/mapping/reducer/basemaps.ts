import { combineReducers } from 'redux';
import { types, MapActions } from '../actions';

export interface BasemapsState {
  isVisible: boolean;
  isExpanded: boolean;
  selected: string;
}

const initialState: BasemapsState = {
  isVisible: true,
  isExpanded: false,
  selected: 'Imagery',
};

const isVisible = (state = initialState.isVisible, action: MapActions) => {
  switch (action.type) {
    case types.OTHER_ACTION: {
      return !state;
    }
    default: {
      return state;
    }
  }
};

const isExpanded = (state = initialState.isExpanded, action: MapActions) => {
  switch (action.type) {
    case types.OTHER_ACTION: {
      return !state;
    }
    default: {
      return state;
    }
  }
};

const selected = (state = initialState.selected, action: MapActions) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

const basemaps = combineReducers({
  isVisible,
  isExpanded,
  selected,
});

export default basemaps;

export const getIsVisible = (state: BasemapsState) => state.isVisible;
export const getIsExpanded = (state: BasemapsState) => state.isExpanded;
export const getSelectedBasemap = (state: BasemapsState) => state.selected;
export const getSelectedBasemapLabels = (state: BasemapsState) => `${getSelectedBasemap(state)}Labels`;

export const fromBasemaps = {
  getIsVisible,
  getIsExpanded,
  getSelectedBasemap,
  getSelectedBasemapLabels,
};
