import invariant from 'invariant';

import createFinalReducer from './reduce-reducers.js';

const isCombinedReducer = Symbol('@@isCombinedReducer');
const isEmpty = Symbol('@@isEmpty');

export default function combineReducers(...reducers) {
  let cache = new Map();
  reducers = reducers.reduce((reducers, reducer) => {
    let _reducer = reducer;
    if (reducer && reducer[isCombinedReducer]) {
      // if is an empty combinedReducer, filter out
      invariant(
        !reducer[isEmpty],
        `
found a combined reducer that has already been cleared.
check the reducer with the name ${reducer[isEmpty]}
`,
      );
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
    const names = Array.from(cache.keys()).join('|');
    cache.clear();
    cache = null;
    finalReducer[isEmpty] = names;
  };
  finalReducer.getCached = () => Array.from(cache.values());

  return finalReducer;
}
