import invariant from 'invariant';

import config from './config';

export type TypeMap = Record<string, string>;

export default function createTypes(ns: string, types: Array<string>): TypeMap {
  const delimiter = config.delimiter;

  invariant(
    Array.isArray(types),
    'createTypes expected a Array of strings for types, but got %s',
    types,
  );

  invariant(
    ns && typeof ns === 'string',
    'createTypes expected a string for ns, but got %s',
    ns,
  );

  return types.reduce((acc, type) => {
    invariant(
      typeof type === 'string',
      'expect type to be a string but found %s',
      type,
    );

    acc[type] = ns + delimiter + type;

    return acc;
  }, {} as TypeMap);
}
