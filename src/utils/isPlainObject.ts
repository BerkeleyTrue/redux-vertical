export default function isPlainObject(
  obj: any,
): obj is Record<string, unknown> {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  let proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}
