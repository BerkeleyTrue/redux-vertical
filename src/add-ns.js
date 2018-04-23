// @flow
export default function addNS<T: any>(ns: string, obj: T): T {
  return Object.defineProperty(obj, 'toString', { value: () => ns });
}
