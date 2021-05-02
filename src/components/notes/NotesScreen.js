import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NotesAppBar } from './NotesAppBar';

import { useForm } from '../../hooks/useForm';
import { setActiveNote, startDeleting } from '../../actions/notes';

export const NotesScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const { values, handleChange, resetForm } = useForm(note);
  const { title, body } = values;
  useEffect(() => {
    if (note.id !== values.id) {
      resetForm(note);
    }
  }, [resetForm, note, values]);
  useEffect(() => {
    dispatch(setActiveNote(values.id, values));
  }, [values, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting());
  };
  return (
    <>
      <NotesAppBar />
      <div className="notes__screen">
        <div className="notes__form">
          <input
            type="text"
            placeholder="Some awesome title"
            autoComplete="off"
            className="notes__input"
            name="title"
            value={title}
            onChange={handleChange}
          />
          <textarea
            className="notes__text-area"
            placeholder="What happend today"
            name="body"
            value={body}
            onChange={handleChange}
          />
        </div>
        <div
          className="notes__picture"
          style={{
            backgroundImage: `url(${note.imageUrl && note.imageUrl})`,
            backgroundSize: 'cover',
          }}
        ></div>
      </div>
      <div className="btn btn-secondary" onClick={handleDelete}>
        Delete
      </div>
    </>
  );
};
