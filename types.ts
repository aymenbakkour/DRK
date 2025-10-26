
export interface Appointment {
  id: string;
  name: string;
  date: string; // ISO string format
  room: string;
  address: string;
}

export interface Transfer {
  id: string;
  name: string;
  date: string; // ISO string format
  room: string;
  address: string;
}

export interface Note {
  id: string;
  content: string;
  date: string; // ISO string format
  isImportant: boolean;
}

export type ActiveTab = 'termine' | 'transfer' | 'notizen';

export type ModalType = 'appointment' | 'transfer' | 'note' | null;
