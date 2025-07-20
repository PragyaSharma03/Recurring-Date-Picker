'use client';

import React from 'react';
import { useRecurrenceStore } from './recurrenceStore';

/**
 * Component for selecting the start and end dates for a recurring pattern
 */
const DateRangePicker: React.FC = () => {
  const startDate = useRecurrenceStore((s) => s.startDate);
  const endDate = useRecurrenceStore((s) => s.endDate);
  const setStartDate = useRecurrenceStore((s) => s.setStartDate);
  const setEndDate = useRecurrenceStore((s) => s.setEndDate);

  const formatDateForInput = (date: Date | null): string => {
    return date ? date.toISOString().slice(0, 10) : '';
  };

  const handleStartDateChange = (value: string) => {
    setStartDate(value ? new Date(value) : null);
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value ? new Date(value) : null);
  };

  return (
    <div className="bg-white/70 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">Start:</span>
          <input
            type="date"
            value={formatDateForInput(startDate)}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 bg-white shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400"
            required
            placeholder="mm/dd/yyyy"
            style={{ minWidth: 140 }}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">End (optional):</span>
          <input
            type="date"
            value={formatDateForInput(endDate)}
            onChange={(e) => handleEndDateChange(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 bg-white shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-gray-900 placeholder-gray-400"
            min={startDate ? formatDateForInput(startDate) : undefined}
            placeholder="mm/dd/yyyy"
            style={{ minWidth: 140 }}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker; 