import _ from 'lodash';
import invariant from 'invariant';
import config from './config';

export default function handleAction(type, reducer = _.identity, defaultState) {
  const types = _.toString(type).split(config.separator);
  invariant(
    !_.isUndefined(defaultState),
    `defaultState for reducer handling ${types.join(', ')} should be defined`,
  );
  invariant(
    _.isFunction(reducer) || _.isPlainObject(reducer),
    'Expected reducer to be a function or object with next and throw reducers',
  );

  const [
    nextReducer,
    throwReducer,
  ] = _.isFunction(reducer) ?
    [ reducer ] :
    [
      reducer.next,
      reducer.throw,
    ].map(
      reducer => _.isNil(reducer) ? undefined : reducer,
    );

  return function actionHandler(state = defaultState, action) {
    const { type: actionType } = action;
    if (!actionType || !_.includes(types, actionType.toString())) {
      return state;
    }

    const handler = throwReducer && action.error ? throwReducer : nextReducer;
    return handler(state, action);
  };
}
