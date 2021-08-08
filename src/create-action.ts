import _ from 'lodash';
import invariant from 'invariant';

import type { Action } from './types';

export default function createAction<Payload, Meta>(
  _type: string,
  payloadCreator: (...any: any) => Payload = _.identity,
  metaCreator?: (...any: any) => Meta,
): (...arg: any) => Action {
  invariant(_type, 'type cannot be undefined or null');
  invariant(
    _.isFunction(payloadCreator) || _.isNull(payloadCreator),
    'Expected payloadCreator to be a function, undefined or null',
  );

  const finalPayloadCreator =
    _.isNull(payloadCreator) || payloadCreator === _.identity
      ? _.identity
      : (head: any, ...args: any[]) =>
          head instanceof Error ? head : payloadCreator(head, ...args);

  const hasMeta = _.isFunction(metaCreator);
  const type = _type.toString();

  const actionCreator = (...args: any[]) => {
    const payload = (finalPayloadCreator as typeof payloadCreator)(...args);
    const action: Action = { type };

    if (payload instanceof Error) {
      action.error = true;
    }

    if (payload !== undefined) {
      action.payload = payload;
    }

    if (hasMeta) {
      action.meta = (metaCreator as Function)(...args);
    }

    return action;
  };

  return actionCreator;
}
