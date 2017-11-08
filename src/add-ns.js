export default function addNS(ns, obj) {
  return Object.defineProperty(obj, 'toString', { value: () => ns });
}
