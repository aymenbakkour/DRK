
import React from 'react';
import { Transfer } from '../types';

interface TransferTableProps {
  transfers: Transfer[];
}

export const TransferTable: React.FC<TransferTableProps> = ({ transfers }) => {
  if (transfers.length === 0) {
    return <div className="p-8 text-center text-gray-500">Keine Überweisungen zum Anzeigen.</div>;
  }
    
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Überweisungsdatum</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Zimmer-Nr.</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Adresse</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {transfers.map((t) => (
            <tr key={t.id} className="hover:bg-gray-800/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(t.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{t.room}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{t.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
