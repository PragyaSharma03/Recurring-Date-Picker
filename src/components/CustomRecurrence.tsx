'use client';

import React from 'react';
import { useRecurrenceStore } from './recurrenceStore';

/**
 * Labels for days of the week (abbreviated)
 */
const daysOfWeekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * Labels for different recurrence types in plural form
 */
const typeLabels: Record<string, string> = {
  daily: 'days',
  weekly: 'weeks',
  monthly: 'months',
  yearly: 'years',
};

/**
 * Component for configuring advanced recurrence options
 * 
 * This component provides different configuration options based on the selected
 * recurrence type:
 * 
 * - **Daily**: Interval input (every X days)
 * - **Weekly**: Interval input + day of week selection
 * - **Monthly**: Interval input + "nth day of month" pattern selection
 * - **Yearly**: Interval input (every X years)
 * 
 * The component automatically shows/hides relevant options based on the
 * current recurrence type selection.
 * 
 * @example
 * ```tsx
 * <CustomRecurrence />
 * ```
 */
const CustomRecurrence: React.FC = () => {
  // Extract state and actions from the store
  const recurrenceType = useRecurrenceStore((s) => s.recurrenceType);
  const interval = useRecurrenceStore((s) => s.interval);
  const setInterval = useRecurrenceStore((s) => s.setInterval);
  const daysOfWeek = useRecurrenceStore((s) => s.daysOfWeek);
  const setDaysOfWeek = useRecurrenceStore((s) => s.setDaysOfWeek);
  const pattern = useRecurrenceStore((s) => s.pattern);
  const setPattern = useRecurrenceStore((s) => s.setPattern);

  /**
   * Toggles a day of the week selection for weekly recurrence
   * @param idx - Index of the day (0-6, where 0 is Sunday)
   */
  const toggleDay = (idx: number) => {
    if (daysOfWeek.includes(idx)) {
      setDaysOfWeek(daysOfWeek.filter((d) => d !== idx));
    } else {
      setDaysOfWeek([...daysOfWeek, idx]);
    }
  };

  /**
   * Available week options for monthly patterns (1st, 2nd, 3rd, 4th, 5th)
   */
  const weekOptions = [1, 2, 3, 4, 5];

  /**
   * Handles interval changes
   * @param value - The new interval value
   */
  const handleIntervalChange = (value: string) => {
    const numValue = Number(value);
    if (numValue > 0) {
      setInterval(numValue);
    }
  };

  /**
   * Handles week selection for monthly patterns
   * @param value - The selected week number
   */
  const handleWeekChange = (value: string) => {
    const week = Number(value);
    setPattern(week ? { week, day: pattern?.day ?? 0 } : null);
  };

  /**
   * Handles day selection for monthly patterns
   * @param value - The selected day of week
   */
  const handleDayChange = (value: string) => {
    const day = Number(value);
    setPattern(pattern?.week ? { week: pattern.week, day } : null);
  };

  return (
    <div className="bg-white/70 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-gray-700 font-medium">Every</span>
        <input
          type="number"
          min={1}
          value={interval}
          onChange={(e) => handleIntervalChange(e.target.value)}
          className="w-20 border-2 border-gray-200 rounded-xl px-3 py-2 bg-white shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 text-center font-semibold text-black transition-all duration-200"
        />
        <span className="font-bold text-gray-900">{typeLabels[recurrenceType]}</span>
      </div>

      {recurrenceType === 'weekly' && (
        <div className="mb-4">
          <div className="flex justify-center gap-2 mb-3">
            {daysOfWeekLabels.map((label, idx) => (
              <button
                key={label}
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${daysOfWeek.includes(idx)
                    ? 'bg-blue-600 text-white scale-105 shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-100 hover:scale-105 border border-gray-200'}`}
                onClick={() => toggleDay(idx)}
                aria-pressed={daysOfWeek.includes(idx)}
              >
                {label}
              </button>
            ))}
          </div>
          {daysOfWeek.length === 0 && (
            <p className="text-sm text-gray-500 text-center">Select days of the week for weekly recurrence</p>
          )}
        </div>
      )}

      {recurrenceType === 'monthly' && (
        <div className="flex items-center justify-center gap-3 text-gray-700">
          <span className="font-medium">The</span>
          <select
            value={pattern?.week || ''}
            onChange={(e) => handleWeekChange(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 bg-white shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          >
            <option value="">--</option>
            {weekOptions.map((w) => (
              <option key={w} value={w}>
                {w === 1 ? 'First' : w === 2 ? 'Second' : w === 3 ? 'Third' : w === 4 ? 'Fourth' : 'Fifth'}
              </option>
            ))}
          </select>
          <select
            value={pattern?.day ?? ''}
            onChange={(e) => handleDayChange(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 bg-white shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          >
            <option value="">--</option>
            {daysOfWeekLabels.map((label, idx) => (
              <option key={label} value={idx}>{label}</option>
            ))}
          </select>
          <span className="font-medium">of the month</span>
        </div>
      )}
    </div>
  );
};

export default CustomRecurrence; 