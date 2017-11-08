import _ from 'lodash';
import invariant from 'invariant';

import addNS from './add-ns.js';

export default function createAction(
  _type,
  payloadCreator = _.identity,
  metaCreator,
) {
  invariant(_type, 'type cannot be undefined or null');
  invariant(
    _.isFunction(payloadCreator) || _.isNull(payloadCreator),
    'Expected payloadCreator to be a function, undefined or null',
  );

  const finalPayloadCreator =
    _.isNull(payloadCreator) || payloadCreator === _.identity ?
      _.identity :
      (head, ...args) =>
        head instanceof Error ? head : payloadCreator(head, ...args);

  const hasMeta = _.isFunction(metaCreator);
  const type = _type.toString();

  const actionCreator = (...args) => {
    const payload = finalPayloadCreator(...args);
    const action = { type };

    if (payload instanceof Error) {
      action.error = true;
    }

    if (payload !== undefined) {
      action.payload = payload;
    }

    if (hasMeta) {
      action.meta = metaCreator(...args);
    }

    return action;
  };

  return addNS(type, actionCreator);
}
