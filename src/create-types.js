import invariant from 'invariant';

import config from './config.js';
import addNS from './add-ns.js';

export default function createTypes(types, ns, delimiter = config.delimiter) {
  invariant(
    Array.isArray(types),
    'createTypes expected a Array of strings for types, but got %s',
    types,
  );
  invariant(
    ns && typeof ns === 'string',
    'createTypes expected a string for ns, but got %s',
    delimiter,
  );
  invariant(
    typeof delimiter === 'string',
    'createAsyncTypes expected a string for delimiter, but got %s',
    delimiter,
  );
  return types.reduce((types, type) => {
    if (typeof type === 'string') {
      types[type] = ns + delimiter + type;
    } else if (
      type &&
      type[config.start] &&
      typeof type.toString === 'function'
    ) {
      types[type] = Object.keys(type).reduce((typeObj, key) => {
        const value = type[key];
        if (key === 'toString') {
          return typeObj;
        } else if (value && typeof value === 'string') {
          typeObj[key] = ns + delimiter + value;
        }
        return typeObj;
      }, addNS(ns + delimiter + type, {}));
    }
    return types;
  }, {});
}
