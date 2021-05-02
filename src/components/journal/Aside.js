import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries';

export const Aside = () => {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.auth);

  const { name } = userAuth;

  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleNewAdd = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="jorunal__aside">
      <header className="journal__header-aside">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg
            width="33"
            height="30"
            viewBox="0 0 33 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 1.61804L19.729 11.5557L19.8412 11.9012H20.2045H30.6536L22.2001 18.0431L21.9062 18.2566L22.0184 18.6021L25.2474 28.5398L16.7939 22.3979L16.5 22.1844L16.2061 22.3979L7.7526 28.5398L10.9816 18.6021L11.0938 18.2566L10.7999 18.0431L2.34641 11.9012H12.7955H13.1588L13.271 11.5557L16.5 1.61804Z"
              stroke="white"
            />
          </svg>
          <p style={{ marginLeft: '3px' }}>{name}</p>
        </div>
        <button className="btn" style={{ opacity: 0.5 }} onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div onClick={handleNewAdd} className="journal__new-entry">
        <i className="fa fa-calendar-plus fa-5x"></i>
        <p style={{ fontSize: '0.8rem', margin: '5px' }}>New entry</p>
      </div>
      <div className="journal__entries">
        <JournalEntries />
      </div>
    </aside>
  );
};
