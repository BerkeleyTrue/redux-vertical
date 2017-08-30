import _ from 'lodash';

import config from './config';

export default function combineActions(...types) {
  return types.map(_.toString).join(config.separator);
}
