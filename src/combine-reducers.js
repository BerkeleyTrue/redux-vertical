import invariant from 'invariant';

import createFinalReducer from './reduce-reducers.js';

const isCombinedReducer = Symbol('@@isCombinedReducer');

export default function combineReducers(...reducers) {
  let cache = new Map();
  let seen = new Set();

  // get cached reducers
  reducers = reducers.reduce((reducers, reducer) => {
    let _reducer = reducer;
    if (reducer && reducer[isCombinedReducer]) {
      // if is an empty combinedReducer, filter out
      _reducer = reducer.getCached();
    }
    return reducers.concat(_reducer);
  }, []);

  // check the reducers
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
  });

  // filter out duplicates
  reducers = reducers.filter(
    r => seen.has(r.toString()) ? false : seen.add(r.toString()),
  );

  // save reducers in cache
  reducers.forEach(r => cache.set(r.toString(), r));

  // create final reducer
  const finalReducer = createFinalReducer(true, reducers);

  // mark as a combinedReducer
  finalReducer[isCombinedReducer] = true;

  finalReducer.getCached = () => Array.from(cache.values());

  return finalReducer;
}
