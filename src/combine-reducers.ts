import type {Reducer, Action} from './types';
import _ from 'lodash';
import invariant from 'invariant';

const isCombinedReducer = Symbol('@@isCombinedReducer');

export default function combineReducers<S>(
  ...reducers: Array<Reducer>
): Reducer {
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
      'reducers should be functions but found %s',
      reducer,
    );
    invariant(
      reducer.toString !== Function.prototype.toString,
      `reducers must have a user defined toString function.
      check the reducer %s`,
      reducer,
    );
  });
  // filter out duplicates
  reducers = reducers.filter(r =>
    seen.has(r.toString()) ? false : seen.add(r.toString()),
  );
  // save reducers in cache
  reducers.forEach(r => cache.set(r.toString(), r));

  // create final reducer
  function finalReducer(state: $Shape<S> & {} = {}, action: Action): $Shape<S> {
    let hasChanged = false;
    const nextState = {};
    const numOfReducers = reducers.length;

    for (let i = 0; i < numOfReducers; i++) {
      const reducer = reducers[i];

      const reducerNS = _.toString(reducer);

      const previousStateForKey = state[reducerNS];
      const nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        throw new Error(`got undefined state for ${reducerNS}`);
      }

      nextState[reducerNS] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  }

  // mark as a combinedReducer
  // $FlowFixMe
  finalReducer[isCombinedReducer] = true;

  finalReducer.getCached = () => Array.from(cache.values());

  return finalReducer;
}
