
export const enum types {
  MAP_SCALE_CHANGED = 'mapping/MAP_SCALE_CHANGED',
  OTHER_ACTION = 'mapping/OTHER_ACTION',
}

export interface MapScaleChangedAction {
  type: types.MAP_SCALE_CHANGED;
  mapScale: number;
}
export const mapScaleChanged = (mapScale: number): MapScaleChangedAction => ({
  type: types.MAP_SCALE_CHANGED,
  mapScale,
});

export type MapActions = 
  | MapScaleChangedAction
  | {type: types.OTHER_ACTION};
  