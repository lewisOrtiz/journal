import { types } from '../types/types';

const initialState = {
  error: false,
  message: '',
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        error: true,
        message: action.payload.message,
      };
    case types.uiRemoveError:
      return {
        error: false,
        message: '',
      };
    default:
      return state;
  }
};
