import _ from 'lodash';
import invariant from 'invariant';

import addNS from './add-ns.js';
import handleAction from './handle-action.js';

function creacteReducers(createHandlers, defaultState) {
  const handlers = createHandlers();
  invariant(
    _.isPlainObject(handlers),
    'createHandlers should return a plain object.',
  );
  return Object.keys(handlers).map(type =>
    handleAction(type, handlers[type], defaultState),
  );
}
export default function handleActions(createHandlers, defaultState, ns) {
  let reducers;
  invariant(
    _.isFunction(createHandlers),
    'createHandlers should be a function',
  );
  function reducer(state = defaultState, action) {
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
