// @flow
import _ from 'lodash';

import config from './config';

export default function combineActions(...types: Array<string>): string {
  return types.map(_.toString).join(config.separator);
}
