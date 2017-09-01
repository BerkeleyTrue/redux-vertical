import invariant from 'invariant';

import createFinalReducer from './reduce-reducers.js';

export default function composeReducers(ns, ...reducers) {
  invariant(
    typeof ns === 'string',
    `ns should be a string but was given ${ns} instead`,
  );
  const composedReducer = createFinalReducer(false, reducers);

  composedReducer.toString = () => ns;
  return composedReducer;
}
