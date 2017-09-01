import invariant from 'invariant';

import createFinalReducer from './reduce-reducers.js';

const isCombinedReducer = Symbol('@@isCombinedReducer');

export default function combineReducers(...reducers) {
  let cache = new Map();
  reducers = reducers.reduce((reducers, reducer) => {
    let _reducer = reducer;
    if (reducer && reducer[isCombinedReducer]) {
      _reducer = reducer.getCached();
      reducer.clearCache();
    }
    return reducers.concat(_reducer);
  }, []);
  reducers.forEach(reducer => {
    invariant(
      typeof reducer === 'function',
      `reducers should be functions but found ${reducer}`,
    );
    invariant(
      reducer.toString !== Function.prototype.toString,
      `reducers must have a user defined toString function.
      check the reducer ${reducer}`,
    );
    cache.set(reducer.toString(), reducer);
  });
  const finalReducer = createFinalReducer(true, reducers);
  finalReducer[isCombinedReducer] = true;

  finalReducer.clearCache = () => {
    cache.clear();
    cache = null;
  };
  finalReducer.getCached = () => Array.from(cache.values());

  return finalReducer;
}
