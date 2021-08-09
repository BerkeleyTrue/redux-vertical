import type {
  Action,
  Reducer,
  ReducersMapObject,
  StateFromReducersMapObject,
} from 'redux';
import invariant from 'invariant';

import isPlainObject from './utils/isPlainObject';

const toString = Object.prototype.toString;

export default function combineReducers(handlers: ReducersMapObject): Reducer {
  invariant(
    isPlainObject(handlers),
    'combineReducers expected a dictionary object of reducers but found %s',
    handlers,
  );

  // check the reducers
  Object.keys(handlers).forEach((ns) => {
    const reducer = handlers[ns];

    invariant(
      typeof reducer === 'function',
      'reducer for %s should be functions but found %s',
      ns,
      reducer,
    );
  });

  // create final reducer
  function finalReducer(
    state: StateFromReducersMapObject<typeof handlers> = {},
    action: Action,
  ): StateFromReducersMapObject<typeof handlers> {
    let hasChanged = false;
    const nextState: StateFromReducersMapObject<typeof handlers> = {};

    Object.keys(handlers).forEach((ns) => {
      const reducer = handlers[ns];
      const previousStateForKey = state[ns];
      const nextStateForKey = reducer(previousStateForKey, action);

      invariant(
        !(typeof nextStateForKey === 'undefined'),
        'expected defined state for ns %s',
        ns,
      );

      nextState[ns] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    });

    return hasChanged ? nextState : state;
  }

  return finalReducer;
}
