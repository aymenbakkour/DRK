
import React, { useState } from 'react';
import { Note } from '../../types';
import { Textarea, Checkbox, Label, Button } from './FormElements';

interface NoteFormProps {
  onAdd: (note: Omit<Note, 'id'>) => void;
  onClose: () => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ onAdd, onClose }) => {
  const [content, setContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;
    onAdd({ content, date: new Date().toISOString(), isImportant });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="content">Notiztext</Label>
        <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={4} required />
      </div>
      <div>
        <Checkbox id="isImportant" checked={isImportant} onChange={(e) => setIsImportant(e.target.checked)} label="Wichtige Notiz"/>
      </div>
      <div className="pt-4">
        <Button>Notiz speichern</Button>
      </div>
    </form>
  );
};
