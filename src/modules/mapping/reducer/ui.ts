import { combineReducers } from 'redux';
import { types, MapActions } from '../actions';

export interface UIState {
  mapScale: number | null;
}

const initialState: UIState = {
  mapScale: null,
};

const mapScale = (state = initialState.mapScale, action: MapActions) => {
  switch (action.type) {
    case types.MAP_SCALE_CHANGED: {
      return action.mapScale;
    }
    default: {
      return state;
    }
  }
};

const ui = combineReducers({
  mapScale,
});

export default ui;

export const getMapScale = (state: UIState) => state.mapScale;

export const fromUI = {
  getMapScale,
};
