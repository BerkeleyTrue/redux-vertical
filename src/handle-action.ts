import _ from 'lodash';
import invariant from 'invariant';

import type { Reducer, Action } from './types';
import config from './config';

export default function handleAction<S>(
  type: string,
  reducer: Reducer = _.identity,
  defaultState: S,
): Reducer {
  invariant(type, 'type should be a string or an async type object');

  const types = _.toString(type).split(config.separator);

  invariant(_.isFunction(reducer), 'reducer should be a function');
  invariant(
    !_.isUndefined(defaultState),
    `defaultState for reducer handling ${types.join(', ')} should be defined`,
  );

  return function actionHandler(state: S = defaultState, action: Action): S {
    const { type: actionType } = action;

    if (!actionType || !_.includes(types, actionType.toString())) {
      return state;
    }

    return reducer(state, action);
  };
}
