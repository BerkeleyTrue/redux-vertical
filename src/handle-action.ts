import invariant from 'invariant';

import type { Reducer, Action } from './types';
import config from './config';
import toString from './utils/toString';

export default function handleAction<S>(
  type: string,
  reducer: Reducer = (x) => x,
  defaultState: S,
): Reducer {
  invariant(type, 'type should be a string or an async type object');

  const types = toString(type).split(config.separator);

  invariant(
    typeof reducer === 'function',
    'reducer should be a function but got %s',
    reducer,
  );

  invariant(
    !(defaultState === undefined),
    `defaultState for reducer handling %s should be defined but got %s`,
    types.join(', '),
    defaultState,
  );

  return function actionHandler(state: S = defaultState, action: Action): S {
    const actionType = toString(action.type);

    if (!actionType || !types.includes(actionType)) {
      return state;
    }

    return reducer(state, action);
  };
}
