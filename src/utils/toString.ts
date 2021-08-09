export default function toString(str: unknown): string {
  return String.prototype.toString.call(str);
}
