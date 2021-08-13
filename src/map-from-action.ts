import type { Reducer, Action, AnyAction } from 'redux';

export interface MapAction<A extends Action = AnyAction>{
  <T extends A>(action: T): any
}

export interface Updater<M = any, S = any>{
  (mapped: M, state: S): any
}
/**
 * creates a handler for handleActions that will map and action and give you a
 * simpler interface to work with.
 */
export default function mapFromAction(mapAction: MapAction, updater: Updater): Reducer {
  return (state, action) => updater(mapAction(action), state);
}
