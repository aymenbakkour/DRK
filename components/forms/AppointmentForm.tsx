
import React, { useState } from 'react';
import { Appointment } from '../../types';
import { Input, Label, Button } from './FormElements';

interface AppointmentFormProps {
  onAdd: (appointment: Omit<Appointment, 'id'>) => void;
  onClose: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [room, setRoom] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date || !room || !address) return;
    onAdd({ name, date: new Date(date).toISOString(), room, address });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="date">Termindatum</Label>
        <Input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="room">Zimmer-Nr.</Label>
        <Input type="text" id="room" value={room} onChange={(e) => setRoom(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="address">Adresse</Label>
        <Input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div className="pt-4">
        <Button>Termin speichern</Button>
      </div>
    </form>
  );
};
