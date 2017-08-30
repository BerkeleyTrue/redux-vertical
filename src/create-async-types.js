import invariant from 'invariant';
import { config } from './config.js';

export function createAsyncTypes(type, delimiter = config.delimiter) {
  invariant(
    type && typeof type === 'string',
    'createAsyncTypes expected a string for type, but got %s',
    type,
  );
  invariant(
    typeof delimiter === 'string',
    'createAsyncTypes expected a string for delimiter, but got %s',
    delimiter,
  );
  const { start, next, complete, error } = config;
  return {
    [start]: type + delimiter + config.start,
    [next]: type + delimiter + config.next,
    [error]: type + delimiter + config.error,
    [complete]: type + delimiter + config.complete,
    toString: () => type,
  };
}
