
import React, { useState } from 'react';
import { Transfer } from '../../types';
import { Input, Label, Button } from './FormElements';

interface TransferFormProps {
  onAdd: (transfer: Omit<Transfer, 'id'>) => void;
  onClose: () => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({ onAdd, onClose }) => {
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
        <Label htmlFor="date">Überweisungsdatum</Label>
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
        <Button>Überweisung speichern</Button>
      </div>
    </form>
  );
};
