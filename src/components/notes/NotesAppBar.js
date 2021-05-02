import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startUpdate, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
  const { active } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const handleSave = () => {
    dispatch(startUpdate(active));
  };
  const handleAddPicture = () => {
    document.getElementById('imageSelector').click();
  };
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      dispatch(startUploading(file));
    }
  };
  return (
    <>
      <header className="journal__app-bar">
        <p>12 de Abril de 2021</p>
        <input
          type="file"
          id="imageSelector"
          accept="image/png, image/jpeg, image/jpg"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <div className="journal__actions">
          <button className="btn" onClick={handleAddPicture}>
            Picture
          </button>
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </header>
    </>
  );
};
