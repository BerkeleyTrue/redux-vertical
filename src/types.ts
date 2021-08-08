import type { Reducer as ReduxReducer } from 'redux';

export type Action = {
  type: string;
  payload?: any;
  meta?: any;
  error?: boolean;
};
export type Reducer = ReduxReducer;

export type Handlers = Record<string, Reducer>;
