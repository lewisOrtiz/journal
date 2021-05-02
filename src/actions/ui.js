import { types } from '../types/types';
export const setError = (message) => ({
  type: types.uiSetError,
  payload: { message },
});
export const removeError = () => ({ type: types.uiRemoveError });
