
import React from 'react';

interface NotificationBadgeProps {
  label: string;
  count: number;
  color: 'red' | 'blue' | 'green';
}

const colorClasses = {
  red: 'bg-red-900/50 border-red-600',
  blue: 'bg-blue-900/50 border-blue-600',
  green: 'bg-green-900/50 border-green-600',
};

const textColorClasses = {
    red: 'text-red-300',
    blue: 'text-blue-300',
    green: 'text-green-300',
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ label, count, color }) => {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${colorClasses[color]}`}>
      <span className={`text-2xl font-bold ${textColorClasses[color]}`}>{count}</span>
      <span className="text-gray-300">{label}</span>
    </div>
  );
};
