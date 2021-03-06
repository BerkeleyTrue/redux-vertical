// @flow
import type { Reducer, Action } from './flow-types.js';
import invariant from 'invariant';

import addNS from './add-ns.js';

export default function composeReducers<S, A: Action, R: Reducer>(
  ns: string,
  ...reducers: Array<R>
): (S, A) => S {
  invariant(
    typeof ns === 'string',
    `ns should be a string but was given ${ns} instead`,
  );
  reducers.forEach(reducer =>
    invariant(
      typeof reducer === 'function',
      'reducer should be functions but found %s',
      reducer,
    ),
  );

  function composedReducer(state: S, action: A): S {
    let hasChanged = false;
    return reducers.reduce((iteratedState: S, reducer: R) => {
      const nextState: S = reducer(iteratedState, action);

      hasChanged = hasChanged || iteratedState !== nextState;

      return hasChanged ? nextState : iteratedState;
    }, state);
  }

  return addNS(ns, composedReducer);
}
