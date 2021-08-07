export default function addNS<T extends any>(ns: string, obj: T): T {
  return Object.defineProperty(obj, 'toString', {
    value: () => ns,
  });
}
