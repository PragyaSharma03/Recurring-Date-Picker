'use client';

import React from 'react';
import { useRecurrenceStore, RecurrenceType } from './recurrenceStore';
import { FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaCalendar } from 'react-icons/fa';

const options: { label: string; value: RecurrenceType; icon: React.ReactNode }[] = [
  { label: 'Daily', value: 'daily', icon: <FaCalendarDay className="inline-block mr-1" /> },
  { label: 'Weekly', value: 'weekly', icon: <FaCalendarWeek className="inline-block mr-1" /> },
  { label: 'Monthly', value: 'monthly', icon: <FaCalendarAlt className="inline-block mr-1" /> },
  { label: 'Yearly', value: 'yearly', icon: <FaCalendar className="inline-block mr-1" /> },
];

/**
 * Component for selecting the type of recurrence pattern
 */
const RecurrenceOptions: React.FC = () => {
  const recurrenceType = useRecurrenceStore((s) => s.recurrenceType);
  const setRecurrenceType = useRecurrenceStore((s) => s.setRecurrenceType);

  const handleTypeChange = (type: RecurrenceType) => {
    setRecurrenceType(type);
  };

  return (
    <div className="flex justify-center gap-3 my-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`flex items-center px-5 py-2 rounded-full shadow-md transition-all duration-150 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-400
            ${recurrenceType === opt.value
              ? 'bg-blue-600 text-white scale-105 shadow-lg'
              : 'bg-white text-gray-700 hover:bg-blue-100 hover:scale-105 border border-gray-200'}
          `}
          onClick={() => handleTypeChange(opt.value)}
          type="button"
          aria-pressed={recurrenceType === opt.value}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default RecurrenceOptions; 