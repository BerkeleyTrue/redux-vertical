import addNS from '../src/add-ns';

test('should add ns to string return', () => {
  const ns = 'foo';
  function bar() {
    console.log('foo');
  }
  addNS(ns, bar);
  expect(ns).toBe(String(bar));
  expect(Object.keys(bar).some(key => key === 'toString')).toBe(false);
});
