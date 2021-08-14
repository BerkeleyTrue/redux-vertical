import type { Action, Dispatch } from 'redux';

function arrayMiddleware<D extends Dispatch = Dispatch>({
  dispatch,
}: {
  dispatch: D;
}) {
  return (next: D) =>
    (action: Action | Action[]): any => {
      if (Array.isArray(action)) {
        return action.filter(Boolean).map(dispatch);
      }
      return next(action);
    };
}

export default arrayMiddleware;
