'use client';

import React, { useEffect } from 'react';
import { useRecurrenceStore } from './recurrenceStore';
import DateRangePicker from './DateRangePicker';
import RecurrenceOptions from './RecurrenceOptions';
import CustomRecurrence from './CustomRecurrence';
import MiniCalendarPreview from './MiniCalendarPreview';

/**
 * Main component for the recurring date picker application
 */
const RecurringDatePicker: React.FC = () => {
  // Extract state and actions from the store
  const generatePreview = useRecurrenceStore((s) => s.generatePreview);
  const startDate = useRecurrenceStore((s) => s.startDate);
  const previewDates = useRecurrenceStore((s) => s.previewDates);
  const recurrenceType = useRecurrenceStore((s) => s.recurrenceType);
  const interval = useRecurrenceStore((s) => s.interval);
  const daysOfWeek = useRecurrenceStore((s) => s.daysOfWeek);
  const pattern = useRecurrenceStore((s) => s.pattern);

  useEffect(() => {
    generatePreview();
  }, [startDate, recurrenceType, interval, daysOfWeek, pattern, generatePreview]);

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-3xl shadow-2xl bg-white">
      <h1 className="text-3xl font-extrabold text-center mb-10 py-4 rounded-2xl text-black tracking-tight">
        Recurring Date Picker
      </h1>
      <div className="space-y-8">
        <DateRangePicker />
        <RecurrenceOptions />
        <CustomRecurrence />
        <MiniCalendarPreview />
      </div>
      <div className="mt-10 p-6 bg-white/80 rounded-2xl shadow-inner">
        <h3 className="sr-only">Generated Dates</h3>
        <div className="text-sm text-gray-700">
          {startDate ? (
            <div>
              <p className="mb-2 font-semibold text-gray-800">Generated dates based on your configuration:</p>
              <div className="max-h-40 overflow-y-auto">
                {previewDates.length > 0 ? (
                  <ul className="space-y-1">
                    {previewDates.slice(0, 20).map((date, index) => (
                      <li key={index} className="text-gray-600">
                        {date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </li>
                    ))}
                    {previewDates.length > 20 && (
                      <li className="text-gray-500 italic">
                        ... and {previewDates.length - 20} more dates
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-500">No dates generated yet. Please configure your recurrence options.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Please select a start date to see the preview.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecurringDatePicker; 