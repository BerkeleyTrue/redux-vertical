import test from 'ava';

import { createAction, createAsyncTypes } from '../src';

test('should throw if type is Void', t => {
  t.throws(() => createAction());
});

test('should throw if payloadCreator is not Function|Void', t => {
  t.throws(() => createAction('foo', 'bar'));
});

test('should return an action creator', t => {
  const ac = createAction('foo');
  t.deepEqual(
    ac(),
    { type: 'foo' }
  );
});

test('should accept payloadCreator', t => {
  const ac = createAction('foo', () => 'bar');
  t.deepEqual(
    ac(),
    {
      type: 'foo',
      payload: 'bar',
    }
  );
});

test('should add error as only payload', t => {
  const ac = createAction('foo', () => 'bar');
  const payload = new Error('baz');
  t.deepEqual(
    ac(payload, 1, 2),
    {
      type: 'foo',
      payload: payload,
      error: true,
    }
  );
});

test('should accept metaCreator function', t => {
  const ac = createAction('foo', undefined, () => 'bar');
  t.deepEqual(
    ac(),
    {
      type: 'foo',
      meta: 'bar',
    }
  );
});

test('should return type when func is toStringd', t => {
  const ac = createAction('foo');
  t.is(String(ac), 'foo');
});

test('should work with async action', t => {
  const ac = createAction(createAsyncTypes('foo'));
  t.is(String(ac), 'foo');
  t.deepEqual(
    ac(),
    { type: 'foo' },
  );
});
