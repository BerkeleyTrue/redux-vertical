// @flow
import type { FluxStandardAction } from 'flux-standard-action';
import type { Reducer as ReduxReducer } from 'redux';

export type Action = FluxStandardAction<string, *, *>;
export type Reducer = ReduxReducer<*, Action>;
