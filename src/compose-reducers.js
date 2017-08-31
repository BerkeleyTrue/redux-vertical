import invariant from 'invariant';

export default function composeReducers(ns, ...reducers) {
  invariant(
    typeof ns === 'string',
    `ns should be a string but was given ${ns} instead`,
  );
  function composedReducer(state, action) {
    let hasChanged = false;
    const nextState = reducers.reduce((oldState, reducer) => {
      const newState = reducer(oldState, action);
      if (!hasChanged && oldState !== newState) {
        hasChanged = true;
      }
      return hasChanged ? newState : oldState;
    }, state);
    return hasChanged ? nextState : state;
  }
  composedReducer.toString = () => ns;
  return composedReducer;
}
