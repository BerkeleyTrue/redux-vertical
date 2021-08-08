import _ from 'lodash/fp';
import invariant from 'invariant';

import config from './config';

export type TypeMap = Record<string, string>;

export default function createTypes(types: Array<string>, ns: string): TypeMap {
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

  return _.flow(
    _.map((type) => [type, ns + delimiter + type]),
    _.fromPairs,
  )(types);
}
