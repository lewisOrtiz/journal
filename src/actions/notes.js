import { db } from '../firebase/config';
import { types } from '../types/types';

import swal from 'sweetalert2';

import { loadNotes } from '../helpers/loadNotes';
import { uploadImage } from '../helpers/uploadImage';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // el segundo arg es una funcion para obtener el estate
    const { auth } = getState();
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };
    const docRef = await db
      .collection(`${auth.uid}/journal/notes`)
      .add(newNote);
    dispatch(setActiveNote(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote));
  };
};

export const setActiveNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    note: { id, ...note },
  },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: {
    notes: notes,
  },
});

export const startUpdate = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!note.imageUrl) {
      delete note.imageUrl;
    }
    const noteToFirebase = { ...note };
    delete noteToFirebase.id;
    try {
      await db.doc(`/${uid}/journal/notes/${note.id}`).update(noteToFirebase);
      dispatch(refreshNote(note.id, note));
      swal.fire({
        title: 'Nota guardada.',
        icon: 'success',
      });
    } catch (error) {
      console.log(error);
      swal.fire({
        title: 'Nota NO guardada.',
        icon: 'error',
      });
    }
  };
};

const refreshNote = (id, note) => ({
  type: types.notesUdated,
  payload: {
    id,
    note: { ...note },
  },
});

export const startDeleting = () => {
  return async (dispatch, getState) => {
    const { id: noteID } = getState().notes.active;
    const { uid } = getState().auth;
    try {
      await db.doc(`${uid}/journal/notes/${noteID}`).delete();
      dispatch(noteDeleted(noteID));
      swal.fire({
        icon: 'success',
        text: 'Nota eliminada.',
      });
    } catch (error) {
      console.log(error);
      swal.fire({
        icon: 'error',
        text: 'Ha ocurrido un error.',
      });
    }
  };
};

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: noteActive } = getState().notes;
    swal.fire({
      icon: 'info',
      title: 'Cargando...',
      text: 'Espera...',
      allowOutsideClick: false,
      showCloseButton: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        swal.showLoading();
      },
    });
    const imageUrl = await uploadImage(file);

    noteActive.imageUrl = imageUrl;

    dispatch(startUpdate(noteActive));
    dispatch(refreshNote(noteActive.id, noteActive));
  };
};

const noteDeleted = (id) => ({
  type: types.notesDeleted,
  payload: { id },
});

export const cleanLogout = () => ({
  type: types.notesLogoutCleaning,
});
