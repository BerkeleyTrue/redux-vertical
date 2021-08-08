import config from './config';

const toString = Object.prototype.toString;

export default function combineActions(...types: string[]): string {
  return types.map((type) => toString.call(type)).join(config.separator);
}
