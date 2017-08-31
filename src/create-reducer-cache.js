import invariant from 'invariant';
// interface createReducerCache {
//  (...Reducer) => createReducerCache,
//  getFinalReducer() => Reducer // create combined reducer
//  clearCache() => Void // clear cache after SSR
// }

const cache = new Map();

export default function createReducerCache(...reducers) {
  if (!Array.isArray(reducers)) {
    reducers = [ reducers ];
  }
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
  reducers.forEach(reducer => cache.set(reducer.toString(), reducer));
  return createReducerCache;
}

createReducerCache.getFinalReducer = () => {
  const reducers = Array.from(cache.values());
  function finalReducer(state = {}, action) {
    let hasChanged = false;
    const newState = reducers.reduce((newState, reducer) => {
      const prevState = state[reducer];
      const nextState = reducer(prevState, action);
      newState[reducer] = nextState;
      hasChanged = hasChanged || nextState !== prevState;
      return newState;
    }, {});
    return hasChanged ? newState : state;
  }
  return finalReducer;
};

createReducerCache.clearCache = () => cache.clear();
