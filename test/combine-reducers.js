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
    type === 'bar' ? { val: 2 } : state;
  barReducer.toString = () => 'bar';
  const bazReducer = (state = { val: 0 }, { type }) =>
    type === 'baz' ? { val: 3 } : state;
  bazReducer.toString = () => 'baz';
  const booReducer = (state = { val: 0 }, { type }) =>
    type === 'boo' ? { val: 4 } : state;
  booReducer.toString = () => 'boo';
  const reducer = combineReducers(fooReducer, barReducer);
  const reducer2 = combineReducers(booReducer, bazReducer);
  const reducer3 = combineReducers(reducer, reducer2);

  t.deepEqual(reducer3({}, { type: 'foo' }), {
    foo: { val: 1 },
    bar: { val: 0 },
    baz: { val: 0 },
    boo: { val: 0 },
  });
  t.deepEqual(reducer3({}, { type: 'bar' }), {
    foo: { val: 0 },
    bar: { val: 2 },
    baz: { val: 0 },
    boo: { val: 0 },
  });
  t.deepEqual(reducer3({}, { type: 'baz' }), {
    foo: { val: 0 },
    bar: { val: 0 },
    baz: { val: 3 },
    boo: { val: 0 },
  });
  t.deepEqual(reducer3({}, { type: 'boo' }), {
    foo: { val: 0 },
    bar: { val: 0 },
    baz: { val: 0 },
    boo: { val: 4 },
  });
});

test('should throw double entry combinedReducers with name', t => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 1 } : state;
  fooReducer.toString = () => 'foo';
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'bar' ? { val: 2 } : state;
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);

  t.throws(
    () => combineReducers(reducer, reducer),
    /found a combined reducer.*[\n]*.*foo\|bar/,
  );
});
