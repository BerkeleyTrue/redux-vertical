import test from 'ava';
import sinon from 'sinon';

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

  t.deepEqual(reducer({}, { type: 'foo' }), { foo: 1, bar: 0 });
  t.deepEqual(reducer({}, { type: 'bar' }), { foo: 0, bar: 2 });
});

test('should change state per namespace for all ns', t => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 1 } : state;
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 2 } : state;
  fooReducer.toString = () => 'foo';
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);

  t.deepEqual(reducer({}, { type: 'foo' }), {
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

test('should filter out double entries', t => {
  const fooReducer = sinon.spy(
    (state = { val: 0 }, { type }) => type === 'foo' ? { val: 1 } : state,
  );
  fooReducer.toString = () => 'foo';
  const barReducer = sinon.spy(
    (state = { val: 0 }, { type }) => type === 'bar' ? { val: 2 } : state,
  );
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);
  const combined = combineReducers(reducer, reducer);
  const actual = combined(undefined, { type: 'foo' });
  t.is(actual.foo.val, 1);
  t.is(fooReducer.callCount, 1);
  t.is(barReducer.callCount, 1);
});

test("should not default other ns's out double entries", t => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'booo' ? { val: 1 } : state;
  fooReducer.toString = () => 'booo';
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'bar' ? { val: 2 } : state;
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);
  const actual = reducer({ bar: { val: 4 } }, { type: 'booo' });
  t.is(actual.booo.val, 1);
  t.is(actual.bar.val, 4);
});

test('should change state with new ref', t => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'booo' ? { val: 1 } : state;
  fooReducer.toString = () => 'booo';
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'bar' ? { val: 2 } : state;
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);
  const original = { bar: { val: 4 } };
  const actual = reducer(original, { type: 'booo' });
  t.is(actual.booo.val, 1);
  t.is(actual.bar.val, 4);
  t.not(original, actual);
});

test("should not change ref is state doesn't change", t => {
  const fooReducer = (state = { val: 0 }, { type }) =>
    type === 'foo' ? { val: 1 } : state;
  fooReducer.toString = () => 'foo';
  const barReducer = (state = { val: 0 }, { type }) =>
    type === 'bar' ? { val: 2 } : state;
  barReducer.toString = () => 'bar';
  const reducer = combineReducers(fooReducer, barReducer);
  const original = { foo: { val: 0 }, bar: { val: 4 } };
  const actual = reducer(original, { type: 'booo' });
  t.is(actual.foo.val, 0);
  t.is(actual.bar.val, 4);
  t.is(original, actual);
});
