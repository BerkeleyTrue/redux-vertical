// @flow
import type { Action } from './flow-types.js';
import _ from 'lodash';
import invariant from 'invariant';

import addNS from './add-ns.js';
import type { AsyncActionTypeMap } from './create-async-types.js';

export default function createAction<Payload: any, Meta: any>(
  _type: string | AsyncActionTypeMap,
  payloadCreator?: (...any) => Payload = _.identity,
  metaCreator?: void | (...any) => Meta,
): (...any) => Action {
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
    const action: Action = { type };

    if (payload instanceof Error) {
      action.error = true;
    }

    if (payload !== undefined) {
      action.payload = payload;
    }

    if (hasMeta) {
      // flow does not currently do user defined
      // type guards (i.e. lodash isFunction)
      // We ignore the following typing error
      // (metaCreator undefined is not compatible with function)
      // $FlowFixMe
      action.meta = metaCreator(...args);
    }

    return action;
  };

  return addNS(type, actionCreator);
}
