import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../actions/notes';
export const JournalEntry = ({ date, id, title, body, imageUrl }) => {
  /*   const days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  }; */
  const dateNote = new moment(date);
  const dispatch = useDispatch();
  const handleClickEntry = () => {
    const note = {
      title,
      body,
      imageUrl,
      date,
    };
    dispatch(setActiveNote(id, note));
  };

  return (
    <div className="journal__journal-entry" onClick={handleClickEntry}>
      <div className="journal__journal-entry-date">
        <h4>{dateNote.format('dddd')}</h4>
        <h4>{dateNote.format('Do')}</h4>
      </div>
      <div className="journal__journal-entry-text">
        <h4>{title}</h4>
        <p>{body || 'Body'}</p>
      </div>
      {imageUrl ? (
        <div
          className="journal__journal-entry-img"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
      ) : (
        <div
          className="journal__journal-entry-img"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(https://cdn.shopify.com/s/files/1/0740/0383/files/cute-3106473__340_2048x2048.jpg?v=1541113625)`,
          }}
        ></div>
      )}
    </div>
  );
};
