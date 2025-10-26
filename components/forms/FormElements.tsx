
import React from 'react';

// Common Input styling
const inputClasses = "w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white";

export const Label: React.FC<{ htmlFor: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-300 mb-1">
    {children}
  </label>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input {...props} className={inputClasses} />
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea {...props} className={inputClasses} />
);

export const Checkbox: React.FC<{ id: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; label: string }> = ({ id, checked, onChange, label }) => (
    <div className="flex items-center">
        <input
            id={id}
            name={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-cyan-600 focus:ring-cyan-500"
        />
        <label htmlFor={id} className="ml-2 block text-sm text-gray-300">
            {label}
        </label>
    </div>
);

export const Button: React.FC<{ children: React.ReactNode, type?: 'button' | 'submit' | 'reset' }> = ({ children, type = 'submit' }) => (
  <button
    type={type}
    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500"
  >
    {children}
  </button>
);
