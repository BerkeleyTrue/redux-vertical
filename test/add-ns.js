import test from 'ava';

import { addNS } from '../src';

test('should add ns to string return', t => {
  const ns = 'foo';
  function bar() {}
  addNS(ns, bar);
  t.is(ns, String(bar));
  t.false(Object.keys(bar).some(key => key === 'toString'));
});
