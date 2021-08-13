import invariant from 'invariant';

import type { Action } from './types';
import toString from './utils/toString';

const identity = (x: any) => x;

export default function createAction<Payload, Meta>(
  _type: string,
  payloadCreator: (...any: any) => Payload = identity,
  metaCreator?: (...any: any) => Meta,
): (...arg: any) => Action {
  invariant(_type, 'type cannot be undefined or null');
  invariant(
    typeof payloadCreator === 'function' || payloadCreator === null,
    'Expected payloadCreator to be a function, undefined or null',
  );

  const finalPayloadCreator =
    payloadCreator === null || payloadCreator === identity
      ? identity
      : (head: any, ...args: any[]) =>
          head instanceof Error ? head : payloadCreator(head, ...args);

  const hasMeta = typeof metaCreator === 'function';
  const type = toString(_type);

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
