'use client';

import React, { useState } from 'react';
import { useRecurrenceStore } from './recurrenceStore';

/**
 * Generates an array of all dates in a given month
 * @param year - The year
 * @param month - The month (0-11, where 0 is January)
 * @returns Array of Date objects for each day in the month
 */
function getMonthDays(year: number, month: number): Date[] {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

/**
 * Component for displaying a mini calendar with preview dates highlighted
 * 
 * This component provides a month-by-month calendar view that shows:
 * - Current month calendar grid
 * - Navigation between months
 * - Highlighted dates that match the current recurrence pattern
 * - Visual feedback for generated dates
 * 
 * The calendar automatically initializes to show the start date's month
 * or the current month if no start date is set.
 * 
 * @example
 * ```tsx
 * <MiniCalendarPreview />
 * ```
 */
const MiniCalendarPreview: React.FC = () => {
  // Extract state from the store
  const previewDates = useRecurrenceStore((s) => s.previewDates);
  const startDate = useRecurrenceStore((s) => s.startDate);
  
  // Local state for calendar navigation
  const today = new Date();
  const [viewYear, setViewYear] = useState(startDate?.getFullYear() || today.getFullYear());
  const [viewMonth, setViewMonth] = useState(startDate?.getMonth() || today.getMonth());
  
  // Get all days for the current view month
  const days = getMonthDays(viewYear, viewMonth);

  /**
   * Checks if a given date is in the preview dates list
   * @param date - The date to check
   * @returns True if the date is in the preview list
   */
  const isPreview = (date: Date): boolean =>
    previewDates.some((d) =>
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
    );

  /**
   * Navigate to the previous month
   */
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  /**
   * Navigate to the next month
   */
  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  /**
   * Day of week labels for the calendar header
   */
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white/70 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={handlePrevMonth} 
          className="p-2 rounded-full bg-white shadow-md hover:bg-blue-100 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-bold text-lg text-gray-800">
          {new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </span>
        <button 
          onClick={handleNextMonth} 
          className="p-2 rounded-full bg-white shadow-md hover:bg-blue-100 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Next month"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center border-2 border-gray-200 rounded-2xl bg-white shadow-inner overflow-hidden">
        {dayLabels.map((d) => (
          <div key={d} className="font-bold text-xs text-gray-600 p-2 bg-gray-50">
            {d}
          </div>
        ))}
        
        {Array(days[0].getDay()).fill(null).map((_, i) => (
          <div key={`pad-${i}`} className="p-2"></div>
        ))}
        
        {days.map((date) => (
          <div
            key={date.toISOString()}
            className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-110
              ${isPreview(date) 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendarPreview; 