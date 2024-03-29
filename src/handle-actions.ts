import invariant from 'invariant';

import type { Action, Reducer, Handlers } from './types';
import handleAction from './handle-action';
import isPlainObject from './utils/isPlainObject';

function createReducers<S>(
  handlers: Handlers,
  defaultState: S,
): Array<Reducer> {
  return Object.keys(handlers).map((type) => {
    invariant(
      typeof handlers[type] === 'function',
      'handleActions expects a function for each key but found %s for %s',
      handlers[type],
      type,
    );

    return handleAction(type, handlers[type], defaultState);
  });
}

export default function handleActions<S>(
  handlers: Handlers,
  defaultState: S,
): Reducer {
  invariant(
    isPlainObject(handlers),
    'handleActions expects an object for handlers but found %s',
    handlers,
  );

  const reducers: Array<Reducer> = createReducers(handlers, defaultState);

  function reducer(state: S = defaultState, action: Action): S {
    return reducers.reduce((state, reducer) => reducer(state, action), state);
  }

  return reducer;
}
