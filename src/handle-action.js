// @flow
import type { Reducer, Action } from './flow-types.js';
import _ from 'lodash';
import invariant from 'invariant';

import config from './config';
import type { AsyncActionTypeMap } from './create-async-types.js';

export default function handleAction<
  S,
  RO: { next?: Reducer, throw?: Reducer },
>(
  type: string | AsyncActionTypeMap,
  reducer: Reducer | RO = _.identity,
  defaultState: S,
): Reducer {
  invariant(type, 'type should be a string or an async type object');
  const types = _.toString(type).split(config.separator);
  invariant(
    _.isFunction(reducer) || _.isPlainObject(reducer),
    'reducer should be a function or an object with next and throw reducers',
  );

  invariant(
    !_.isUndefined(defaultState),
    `defaultState for reducer handling ${types.join(', ')} should be defined`,
  );

  let nextReducer: Reducer = _.identity;
  let throwReducer: Reducer = _.identity;
  if (typeof reducer === 'function') {
    nextReducer = reducer;
    throwReducer = reducer;
  } else {
    if (typeof reducer.next === 'function') {
      nextReducer = reducer.next;
    }
    if (typeof reducer.throw === 'function') {
      throwReducer = reducer.throw;
    }
  }

  return function actionHandler(state: S = defaultState, action: Action): S {
    const { type: actionType } = action;
    if (!actionType || !_.includes(types, actionType.toString())) {
      return state;
    }

    const handler: Reducer = action.error ? throwReducer : nextReducer;
    return handler(state, action);
  };
}
