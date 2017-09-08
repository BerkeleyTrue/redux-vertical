const createGetNS = (isNS, ns) =>
  isNS ? (state = {}) => state[ns] : state => state;

const createSetNS = (isNS, ns) =>
  isNS ?
    (state = {}, value) => {
      state[ns] = value;
      return state;
    } :
    (state, value) => value;

export default function createFinalReducer(isNS, reducers) {
  return (state = {}, action) => {
    let hasChanged = false;

    const combinedOrComposed = reducers.reduce((oldState, reducer) => {
      const prevState = createGetNS(isNS, reducer)(oldState);
      const nextState = createSetNS(isNS, reducer)(
        oldState,
        reducer(prevState, action),
      );

      hasChanged = hasChanged || prevState !== nextState;

      if (isNS) {
        return oldState;
      }
      return hasChanged ? nextState : oldState;
    }, state);

    return hasChanged ? combinedOrComposed : state;
  };
}
