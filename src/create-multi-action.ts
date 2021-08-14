import type { Action, AnyAction } from 'redux';

export interface ActionCreator<A extends Action = AnyAction> {
  (...args: any[]): A;
}

/**
 * Create a multi action. Useful when you have an event in a subdomains that triggers a
 * a command action that triggers changes in parent domains.
 *
 * requires the use of arrayMiddleware
 */
const createMultiAction = (
  event: ActionCreator,
  ...commands: ActionCreator[]
) => {
  const actionCreator = (...args: any[]): Action[] => [
    event(...args),
    ...commands.map((ac) => ac(...args)),
  ];

  return actionCreator;
};

export default createMultiAction;
