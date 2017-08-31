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
