import { db } from '../firebase/config';

export const loadNotes = async (uid) => {
  const noteSnap = await db.collection(`${uid}/journal/notes`).get();
  const notes = [];

  noteSnap.forEach((noteHijo) => {
    notes.push({ id: noteHijo.id, ...noteHijo.data() });
  });
  return notes;
};
