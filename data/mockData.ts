
import { Appointment, Transfer, Note } from '../types';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

export const initialAppointments: Appointment[] = [
  { id: 'a1', name: 'Hans Müller', date: today.toISOString(), room: '101', address: 'Gebäude A, 1. Stock' },
  { id: 'a2', name: 'Anna Schmidt', date: tomorrow.toISOString(), room: '205', address: 'Gebäude B, 2. Stock' },
];

export const initialTransfers: Transfer[] = [
  { id: 't1', name: 'Klaus Meier', date: today.toISOString(), room: '302', address: 'St. Marien Krankenhaus' },
];

export const initialNotes: Note[] = [
  { id: 'n1', content: 'Wochenbericht überprüfen', date: today.toISOString(), isImportant: true },
  { id: 'n2', content: 'Team-Meeting vorbereiten', date: tomorrow.toISOString(), isImportant: false },
  { id: 'n3', content: 'Patientenstatus aktualisieren', date: today.toISOString(), isImportant: true },
];
