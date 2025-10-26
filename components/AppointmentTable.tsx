
import React from 'react';
import { Appointment } from '../types';

interface AppointmentTableProps {
  appointments: Appointment[];
}

export const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments }) => {
  if (appointments.length === 0) {
    return <div className="p-8 text-center text-gray-500">Keine Termine zum Anzeigen.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Datum</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Zimmer-Nr.</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Adresse</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {appointments.map((apt) => (
            <tr key={apt.id} className="hover:bg-gray-800/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{apt.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(apt.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{apt.room}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{apt.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
