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
  return (state, action) => {
    let hasChanged = false;

    const combinedOrComposed = reducers.reduce((newOrOld, reducer) => {
      const prevState = createGetNS(isNS, reducer)(newOrOld);
      const nextState = createSetNS(isNS, reducer)(
        newOrOld,
        reducer(prevState, action),
      );

      hasChanged = hasChanged || prevState !== nextState;

      if (isNS) {
        return newOrOld;
      }
      return hasChanged ? nextState : newOrOld;
    }, isNS ? {} : state);

    return hasChanged ? combinedOrComposed : state;
  };
}
