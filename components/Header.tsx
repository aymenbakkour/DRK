import React from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime';

interface HeaderProps {
    onImportClick: () => void;
    onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onImportClick, onExport }) => {
  const { time, date } = useCurrentTime();

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-cyan-400">Dashboard</h1>
            <div className="flex gap-2">
                 <button onClick={onImportClick} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md text-sm transition duration-300">
                    Excel Importieren
                </button>
                <button onClick={onExport} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition duration-300">
                    Excel Exportieren
                </button>
            </div>
        </div>
      <div className="text-left">
        <div className="text-lg font-semibold">{time}</div>
        <div className="text-sm text-gray-400">{date}</div>
      </div>
    </header>
  );
};
