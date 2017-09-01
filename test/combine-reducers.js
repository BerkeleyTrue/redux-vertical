import test from 'ava';

import { combineReducers } from '../src';

test('should throw if is not a function', t => {
  t.throws(() => combineReducers(null), /reducers.*functions/);
});

test('should throw if function does not have namespace toString', t => {
  t.throws(() => combineReducers(() => {}), /reducers.*toString function/);
});

test('should return a function', t => {
  const foo = () => {};
  foo.toString = () => 'foo';
  t.is(typeof combineReducers(foo), 'function');
});

test('should change state per namespace', t => {
  const fooReducer = (state = 0, { type }) => type === 'foo' ? 1 : state;
  const barReducer = (state = 0, { type }) => type === 'bar' ? 2 : state;
  fooReducer.toString = () => 'foo';
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);

  t.deepEqual(reducer(0, { type: 'foo' }), { foo: 1, bar: 0 });
  t.deepEqual(reducer(0, { type: 'bar' }), { foo: 0, bar: 2 });
});

test('should change state per namespace for all ns', t => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 1 } : state;
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 2 } : state;
  fooReducer.toString = () => 'foo';
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);

  t.deepEqual(reducer(0, { type: 'foo' }), {
    foo: { val: 1 },
    bar: { val: 2 },
  });
});

test('should create flat reducer', t => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 1 } : state;
  fooReducer.toString = () => 'foo';
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 2 } : state;
  barReducer.toString = () => 'bar';
  const bazReducer = (state = { val: 0 }, { type }) =>
    type === 'baz' ? { val: 3 } : state;
  bazReducer.toString = () => 'baz';
  const reducer = combineReducers(fooReducer, barReducer);
  const reducer2 = combineReducers(reducer, bazReducer);

  t.deepEqual(reducer2({ val: 0 }, { type: 'baz' }), {
    foo: { val: 0 },
    bar: { val: 0 },
    baz: { val: 3 },
  });
});
