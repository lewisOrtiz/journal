import { types } from '../types/types';

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: { ...action.payload },
      };
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload.notes],
      };
    case types.notesAddNew:
      return {
        ...state,
        notes: [action.payload.note, ...state.notes],
      };
    case types.notesUdated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    case types.notesDeleted:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((nota) => nota.id !== action.payload.id),
      };
    case types.notesLogoutCleaning:
      return {
        ...state,
        notes: [],
        active: null,
      };
    default:
      return state;
  }
};
