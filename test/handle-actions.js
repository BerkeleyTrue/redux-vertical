import test from 'ava';
import { handleActions } from '../src';

test('should throw if createHandlers is not a function', t => {
  t.throws(() => handleActions({}, null), /createHandlers.*function/);
});
