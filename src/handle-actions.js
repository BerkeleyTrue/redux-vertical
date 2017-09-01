import _ from 'lodash';
import invariant from 'invariant';

import handleAction from './handle-action.js';

export default function handleActions(types, createHandlers, defaultState, ns) {
  invariant(
    _.isFunction(createHandlers),
    'createHandlers should be a function',
  );
  const handlers = createHandlers(types);
  invariant(
    _.isPlainObject(handlers),
    'createHandlers should return a plain object.',
  );
  const reducers = Object.keys(handlers).map(type =>
    handleAction(type, handlers[type], defaultState),
  );
  function reducer(state = defaultState, action) {
    return reducers.reduce((state, reducer) => reducer(state, action), state);
  }
  if (ns) {
    reducer.toString = () => ns;
  }
  return reducer;
}
