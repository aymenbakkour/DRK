import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Appointment, Transfer, Note, ActiveTab, ModalType } from './types';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { NotificationBadge } from './components/NotificationBadge';
import { AppointmentTable } from './components/AppointmentTable';
import { TransferTable } from './components/TransferTable';
import { NoteList } from './components/NoteList';
import { Modal } from './components/Modal';
import { AppointmentForm } from './components/forms/AppointmentForm';
import { TransferForm } from './components/forms/TransferForm';
import { NoteForm } from './components/forms/NoteForm';
import { initialAppointments, initialTransfers, initialNotes } from './data/mockData';

declare const XLSX: any;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('termine');
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const notificationCounts = useMemo(() => {
    const todayAppointments = appointments.filter(a => isToday(new Date(a.date))).length;
    const todayTransfers = transfers.filter(t => isToday(new Date(t.date))).length;
    const importantNotes = notes.filter(n => n.isImportant && isToday(new Date(n.date))).length;
    return { todayAppointments, todayTransfers, importantNotes };
  }, [appointments, transfers, notes]);
  
  const handleAddAppointment = (appointment: Omit<Appointment, 'id'>) => {
    setAppointments(prev => [...prev, { ...appointment, id: `a${Date.now()}` }]);
  };

  const handleAddTransfer = (transfer: Omit<Transfer, 'id'>) => {
    setTransfers(prev => [...prev, { ...transfer, id: `t${Date.now()}` }]);
  };

  const handleAddNote = (note: Omit<Note, 'id'>) => {
    setNotes(prev => [...prev, { ...note, id: `n${Date.now()}` }]);
  };

  const handleAddClick = useCallback((modalType: 'appointment' | 'transfer' | 'note') => {
      setModalOpen(modalType);
  }, []);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
          // FIX: Moved sheetNames outside the try block to make it accessible in the catch block.
          const sheetNames = {
              appointments: 'Termine',
              transfers: 'Überweisungen',
              notes: 'Notizen'
          };

          try {
              const data = event.target?.result;
              const workbook = XLSX.read(data, { type: 'binary', cellDates: true });

              const headers = {
                  name: 'Name',
                  date: 'Datum',
                  room: 'Zimmer-Nr.',
                  address: 'Adresse',
                  note: 'Notiz',
                  important: 'Wichtig'
              }

              // Process Appointments
              const appointmentsSheet = workbook.Sheets[sheetNames.appointments];
              if (appointmentsSheet) {
                  const appointmentsData: any[] = XLSX.utils.sheet_to_json(appointmentsSheet);
                  const newAppointments: Appointment[] = appointmentsData.map((row, index) => ({
                      id: `a-import-${Date.now()}-${index}`,
                      name: row[headers.name] || '',
                      date: row[headers.date] instanceof Date ? row[headers.date].toISOString() : new Date().toISOString(),
                      room: String(row[headers.room] || ''),
                      address: row[headers.address] || '',
                  }));
                  setAppointments(newAppointments);
              }

              // Process Transfers
              const transfersSheet = workbook.Sheets[sheetNames.transfers];
              if (transfersSheet) {
                  const transfersData: any[] = XLSX.utils.sheet_to_json(transfersSheet);
                  const newTransfers: Transfer[] = transfersData.map((row, index) => ({
                      id: `t-import-${Date.now()}-${index}`,
                      name: row[headers.name] || '',
                      date: row[headers.date] instanceof Date ? row[headers.date].toISOString() : new Date().toISOString(),
                      room: String(row[headers.room] || ''),
                      address: row[headers.address] || '',
                  }));
                  setTransfers(newTransfers);
              }

              // Process Notes
              const notesSheet = workbook.Sheets[sheetNames.notes];
              if (notesSheet) {
                  const notesData: any[] = XLSX.utils.sheet_to_json(notesSheet);
                  const newNotes: Note[] = notesData.map((row, index) => ({
                      id: `n-import-${Date.now()}-${index}`,
                      content: row[headers.note] || '',
                      date: row[headers.date] instanceof Date ? row[headers.date].toISOString() : new Date().toISOString(),
                      isImportant: String(row[headers.important]).toLowerCase() === 'true' || String(row[headers.important]).toLowerCase() === 'ja',
                  }));
                  setNotes(newNotes);
              }
              alert('Daten erfolgreich importiert!');
          } catch (error) {
              console.error("Error reading Excel file:", error);
              alert(`Fehler beim Lesen der Datei. Bitte stellen Sie sicher, dass die Datei die folgenden Blätter enthält: ${sheetNames.appointments}, ${sheetNames.transfers}, ${sheetNames.notes}.`);
          }
      };
      reader.onerror = (error) => {
          console.error("FileReader error:", error);
          alert('Fehler beim Lesen der Datei.');
      };
      reader.readAsBinaryString(file);

      if(e.target) e.target.value = '';
  };

  const handleExport = () => {
      const headers = {
          name: 'Name',
          date: 'Datum',
          room: 'Zimmer-Nr.',
          address: 'Adresse',
          note: 'Notiz',
          important: 'Wichtig'
      };

      const appointmentsToExport = appointments.map(a => ({
          [headers.name]: a.name,
          [headers.date]: new Date(a.date),
          [headers.room]: a.room,
          [headers.address]: a.address,
      }));
      const transfersToExport = transfers.map(t => ({
          [headers.name]: t.name,
          [headers.date]: new Date(t.date),
          [headers.room]: t.room,
          [headers.address]: t.address,
      }));
      const notesToExport = notes.map(n => ({
          [headers.note]: n.content,
          [headers.date]: new Date(n.date),
          [headers.important]: n.isImportant ? 'Ja' : 'Nein',
      }));

      const appointmentsSheet = XLSX.utils.json_to_sheet(appointmentsToExport);
      const transfersSheet = XLSX.utils.json_to_sheet(transfersToExport);
      const notesSheet = XLSX.utils.json_to_sheet(notesToExport);
      
      const sheetHeaders = {
          appointments: [headers.name, headers.date, headers.room, headers.address],
          transfers: [headers.name, headers.date, headers.room, headers.address],
          notes: [headers.note, headers.date, headers.important]
      };

      XLSX.utils.sheet_add_aoa(appointmentsSheet, [sheetHeaders.appointments], { origin: 'A1' });
      XLSX.utils.sheet_add_aoa(transfersSheet, [sheetHeaders.transfers], { origin: 'A1' });
      XLSX.utils.sheet_add_aoa(notesSheet, [sheetHeaders.notes], { origin: 'A1' });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, appointmentsSheet, 'Termine');
      XLSX.utils.book_append_sheet(workbook, transfersSheet, 'Überweisungen');
      XLSX.utils.book_append_sheet(workbook, notesSheet, 'Notizen');
      
      XLSX.writeFile(workbook, 'DashboardData.xlsx');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'termine':
        return <AppointmentTable appointments={appointments} />;
      case 'transfer':
        return <TransferTable transfers={transfers} />;
      case 'notizen':
        return <NoteList notes={notes} />;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
      switch(modalOpen){
          case 'appointment': return 'Neuer Termin';
          case 'transfer': return 'Neue Überweisung';
          case 'note': return 'Neue Notiz';
          default: return '';
      }
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header onImportClick={handleImportClick} onExport={handleExport} />
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".xlsx, .xls" />

      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <NotificationBadge label="Heutige Termine" count={notificationCounts.todayAppointments} color="red" />
            <NotificationBadge label="Heutige Überweisungen" count={notificationCounts.todayTransfers} color="blue" />
            <NotificationBadge label="Wichtige Notizen heute" count={notificationCounts.importantNotes} color="green" />
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} onAddClick={handleAddClick} />
          <div className="content-area min-h-[400px]">
            {renderContent()}
          </div>
        </div>
      </main>

      <Modal isOpen={modalOpen !== null} onClose={() => setModalOpen(null)} title={getModalTitle()}>
        {modalOpen === 'appointment' && <AppointmentForm onAdd={handleAddAppointment} onClose={() => setModalOpen(null)} />}
        {modalOpen === 'transfer' && <TransferForm onAdd={handleAddTransfer} onClose={() => setModalOpen(null)} />}
        {modalOpen === 'note' && <NoteForm onAdd={handleAddNote} onClose={() => setModalOpen(null)} />}
      </Modal>
    </div>
  );
};

export default App;