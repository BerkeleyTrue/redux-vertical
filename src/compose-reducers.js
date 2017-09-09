import invariant from 'invariant';

export default function composeReducers(ns, ...reducers) {
  invariant(
    typeof ns === 'string',
    `ns should be a string but was given ${ns} instead`,
  );
  reducers.forEach(reducer =>
    invariant(
      typeof reducer === 'function',
      `reducer should be functions but found ${reducer}`,
    ),
  );

  function composedReducer(state, action) {
    let hasChanged = false;
    return reducers.reduce((iteratedState, reducer) => {
      const nextState = reducer(iteratedState, action);

      hasChanged = hasChanged || iteratedState !== nextState;

      return hasChanged ? nextState : iteratedState;
    }, state);
  }

  composedReducer.toString = () => ns;
  return composedReducer;
}
