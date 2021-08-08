import invariant from 'invariant';

import type { Reducer, Action } from './types';

export default function composeReducers<S, A extends Action, R extends Reducer>(
  ns: string,
  ...reducers: Array<R>
): (arg0: S, arg1: A) => S {
  invariant(
    typeof ns === 'string',
    `ns should be a string but was given ${ns} instead`,
  );

  reducers.forEach((reducer) =>
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

  return composedReducer;
}
