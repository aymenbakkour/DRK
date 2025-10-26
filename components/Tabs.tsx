
import React from 'react';
import { ActiveTab } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface TabsProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onAddClick: (modalType: 'appointment' | 'transfer' | 'note') => void;
}

const TabButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  onAdd: () => void;
}> = ({ label, isActive, onClick, onAdd }) => {
  const baseClasses = "flex-1 transition-all duration-300 py-3 px-4 text-center text-lg font-semibold border-b-4 focus:outline-none";
  const activeClasses = "text-cyan-400 border-cyan-400";
  const inactiveClasses = "text-gray-400 border-transparent hover:text-white hover:border-gray-600";
  
  return (
    <div className="flex-1 flex items-center justify-center relative">
        <button
          onClick={onClick}
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          {label}
        </button>
        <button onClick={onAdd} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-700 hover:bg-cyan-500 text-white transition-colors">
            <PlusIcon />
        </button>
    </div>
  );
};


export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, onAddClick }) => {
  return (
    <nav className="flex justify-around bg-gray-800/50 border-b border-gray-700">
      <TabButton
        label="Termine"
        isActive={activeTab === 'termine'}
        onClick={() => setActiveTab('termine')}
        onAdd={() => onAddClick('appointment')}
      />
      <TabButton
        label="Überweisungen"
        isActive={activeTab === 'transfer'}
        onClick={() => setActiveTab('transfer')}
        onAdd={() => onAddClick('transfer')}
      />
      <TabButton
        label="Notizen"
        isActive={activeTab === 'notizen'}
        onClick={() => setActiveTab('notizen')}
        onAdd={() => onAddClick('note')}
      />
    </nav>
  );
};
