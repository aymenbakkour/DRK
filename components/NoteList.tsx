
import React from 'react';
import { Note } from '../types';

interface NoteListProps {
  notes: Note[];
}

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


export const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  if (notes.length === 0) {
    return <div className="p-8 text-center text-gray-500">Keine Notizen zum Anzeigen.</div>;
  }
    
  return (
    <div className="p-4 space-y-3">
      {notes.map((note) => (
        <div 
          key={note.id} 
          className={`p-4 rounded-lg flex items-start gap-4 ${note.isImportant ? 'bg-green-900/40 border border-green-700' : 'bg-gray-800'}`}
        >
          {note.isImportant && <StarIcon />}
          <div className="flex-1">
            <p className="text-white">{note.content}</p>
            <p className="text-xs text-gray-400 mt-2">{new Date(note.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
