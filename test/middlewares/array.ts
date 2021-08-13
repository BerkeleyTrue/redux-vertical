// import _ from 'lodash/fp';
import type { Dispatch } from 'redux';
import { spy } from 'sinon';
import arrayMiddleware from '../../src/middlewares/array';


test('should dispatch each action in an array', () => {
  const dispatch: Dispatch = spy();
  const next: Dispatch = spy();

  arrayMiddleware({ dispatch })(next)([{ type: 'foo' }, { type: 'bar' }]);

  // @ts-ignore
  expect(next.called).toBe(false);

  // @ts-ignore
  expect(dispatch.calledTwice).toBe(true);
});

test('should have passthrough everything esle', () => {
  const dispatch: Dispatch = spy();
  const next: Dispatch = spy();

  arrayMiddleware({ dispatch })(next)({ type: 'foo' });

  // @ts-ignore
  expect(next.called).toBe(true);

  // @ts-ignore
  expect(dispatch.called).toBe(false);
});
