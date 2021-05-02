import React from 'react';
import { useSelector } from 'react-redux';

import { Aside } from './Aside';
import { JuornalContent } from './JuornalContent';
import { NotesScreen } from '../notes/NotesScreen';

export const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);
  return (
    <div className="journal__main-content">
      <Aside />
      <main>{!active ? <JuornalContent /> : <NotesScreen />}</main>
    </div>
  );
};
