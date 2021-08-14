import _ from 'lodash/fp';

import { createMultiAction, createAction } from '../src';

test('should create a multi action', () => {
  const foo = createAction('foo');
  const bar = createAction('bar');
  const ac = createMultiAction(foo, bar);
  const actual = ac();
  expect(_.flow(_.head, _.get('type'))(actual)).toBe('foo');
  expect(_.flow(_.tail, _.head, _.get('type'))(actual)).toBe('bar');
});

test('should create a multi action if only event', () => {
  // don't know why you would do this.
  const foo = createAction('foo');
  const ac = createMultiAction(foo);
  const actual = ac();
  expect(_.flow(_.head, _.get('type'))(actual)).toBe('foo');
  expect(_.flow(_.tail, _.head, _.get('type'))(actual)).toBe(undefined);
});
