// @flow
import type { Reducer, Action } from './flow-types.js';
import _ from 'lodash';
import invariant from 'invariant';

import addNS from './add-ns.js';
import handleAction from './handle-action.js';

type Handlers = {
  [type: string]: Reducer,
};

function creacteReducers<S>(
  createHandlers: () => Handlers,
  defaultState: S,
): Array<Reducer> {
  const handlers: Handlers = createHandlers();
  invariant(
    _.isPlainObject(handlers),
    'createHandlers should return a plain object.',
  );
  return Object.keys(handlers).map(type =>
    handleAction(type, handlers[type], defaultState),
  );
}

export default function handleActions<S>(
  createHandlers: () => Handlers,
  defaultState: S,
  ns: string,
): Reducer {
  let reducers: Array<Reducer>;
  invariant(
    _.isFunction(createHandlers),
    'createHandlers should be a function',
  );
  function reducer(state: S = defaultState, action: Action): S {
    if (!reducers) {
      reducers = creacteReducers(createHandlers, defaultState);
    }
    return reducers.reduce((state, reducer) => reducer(state, action), state);
  }
  if (ns) {
    return addNS(ns, reducer);
  }
  return reducer;
}
