// @flow
import _ from 'lodash';

import config from './config';
import type { AsyncActionTypeMap } from './create-async-types.js';

export default function combineActions(
  ...types: Array<string | AsyncActionTypeMap>
): string {
  return types.map(_.toString).join(config.separator);
}
