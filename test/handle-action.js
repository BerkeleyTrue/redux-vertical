import test from 'ava';

import { config, handleAction } from '../src';

const defaultConfig = Object.assign({}, config);
test.beforeEach(() => {
  Object.assign(config, defaultConfig);
});

test('should throw if type is not a string', t => {
  t.throws(() => handleAction(), /type should be a string/);
});

test('should throw if reducer is not an function/object/undefined', t => {
  t.throws(() => handleAction('foo', null), /reducer.*should be a function/);
});

test('should throw if default state undefined', t => {
  t.throws(() => handleAction('foo'), /defaultState.*should be defined/);
});

test('should return a reducer', t => {
  const reducer = handleAction('foo', () => 1, 0);
  t.is(
    typeof reducer,
    'function'
  );
  t.is(
    reducer(undefined, { type: 'foo' }),
    1
  );
});

test('should accept reducer object', t => {
  const reducer = handleAction('foo', { next: () => 1, throw: () => 2 }, 0);
  t.is(
    reducer(0, { type: 'foo' }),
    1
  );
  t.is(
    reducer(0, { type: 'foo', error: true }),
    2
  );
  const reducer2 = handleAction('foo', { next: () => 1 }, 0);
  t.is(
    reducer2(0, { type: 'foo' }),
    1
  );
});

test('reducer should return default state', t => {
  const reducer = handleAction('foo', () => 1, 0);
  t.is(
    reducer(undefined, {}),
    0
  );
});
