export default function createFinalReducer(isNS, reducers) {
  return (state = {}, action) => {
    let hasChanged = false;

    const combinedOrComposed = reducers.reduce((iteratedState, reducer) => {
      const prevState = isNS ? state[reducer] : iteratedState;
      const nextState = reducer(prevState, action);

      hasChanged = hasChanged || prevState !== nextState;

      if (isNS) {
        iteratedState[reducer] = nextState;
        return hasChanged ? iteratedState : state;
      }
      return hasChanged ? nextState : iteratedState;
    }, isNS ? {} : state);

    return hasChanged ? combinedOrComposed : state;
  };
}
