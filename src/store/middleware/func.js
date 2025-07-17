// Thunk middleware allows action creators to return a function instead of an action object.
// This function can then perform asynchronous operations or dispatch multiple actions.
// Automatically included in Redux Toolkit's default middleware.
const func =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      action(dispatch, getState);
    } else next(action);
  };

export default func;
