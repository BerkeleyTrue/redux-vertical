import constants from './constants';
import toString from './utils/toString';

export default function combineActions(...types: string[]): string {
  return types.map(toString).join(constants.separator);
}
