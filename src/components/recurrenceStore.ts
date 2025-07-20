import { create } from 'zustand';

/**
 * Types of recurrence patterns supported by the application
 */
export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

/**
 * Interface for monthly recurrence patterns
 * Used for "nth day of month" patterns (e.g., 2nd Tuesday)
 */
interface RecurrencePattern {
  /** Week number (1-5) representing 1st, 2nd, 3rd, 4th, or 5th week */
  week?: number;
  /** Day of week (0-6) where 0 is Sunday, 1 is Monday, etc. */
  day?: number;
}

/**
 * Main store interface for managing recurring date state
 */
interface RecurrenceStore {
  /** Start date for the recurring pattern */
  startDate: Date | null;
  /** Optional end date for the recurring pattern */
  endDate: Date | null;
  /** Type of recurrence pattern */
  recurrenceType: RecurrenceType;
  /** Interval between occurrences (e.g., every 2 days) */
  interval: number;
  /** Selected days of the week for weekly recurrence (0-6) */
  daysOfWeek: number[];
  /** Monthly pattern configuration */
  pattern: RecurrencePattern | null;
  /** Generated preview dates based on current configuration */
  previewDates: Date[];
  
  // Action methods
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setRecurrenceType: (type: RecurrenceType) => void;
  setInterval: (interval: number) => void;
  setDaysOfWeek: (days: number[]) => void;
  setPattern: (pattern: RecurrencePattern | null) => void;
  generatePreview: () => void;
}

/**
 * Zustand store for managing recurring date state
 * Provides state management and date generation logic for the recurring date picker
 */
export const useRecurrenceStore = create<RecurrenceStore>((set, get) => ({
  // Initial state
  startDate: null,
  endDate: null,
  recurrenceType: 'daily',
  interval: 1,
  daysOfWeek: [],
  pattern: null,
  previewDates: [],

  // Action implementations
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setRecurrenceType: (type) => set({ recurrenceType: type }),
  setInterval: (interval) => set({ interval }),
  setDaysOfWeek: (days) => set({ daysOfWeek: days }),
  setPattern: (pattern) => set({ pattern }),

  /**
   * Generates preview dates based on current recurrence configuration
   * This function calculates all dates that match the current pattern
   * from the start date to either the end date or one year from start
   */
  generatePreview: () => {
    const { startDate, endDate, recurrenceType, interval, daysOfWeek, pattern } = get();
    
    if (!startDate) {
      set({ previewDates: [] });
      return;
    }

    const dates: Date[] = [];
    const endLimit = endDate || new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
    let currentDate = new Date(startDate);

    while (currentDate <= endLimit) {
      dates.push(new Date(currentDate));

      switch (recurrenceType) {
        case 'daily':
          currentDate.setDate(currentDate.getDate() + interval);
          break;
        
        case 'weekly':
          if (daysOfWeek.length === 0) {
            // If no specific days selected, use the same day of week
            currentDate.setDate(currentDate.getDate() + (7 * interval));
          } else {
            // Find next occurrence based on selected days
            let found = false;
            for (let i = 1; i <= 7 * interval; i++) {
              const nextDate = new Date(currentDate);
              nextDate.setDate(currentDate.getDate() + i);
              if (daysOfWeek.includes(nextDate.getDay())) {
                currentDate = nextDate;
                found = true;
                break;
              }
            }
            if (!found) {
              currentDate.setDate(currentDate.getDate() + (7 * interval));
            }
          }
          break;
        
        case 'monthly':
          if (pattern?.week && pattern?.day !== undefined) {
            // Pattern-based monthly (e.g., 2nd Tuesday)
            const nextMonth = new Date(currentDate);
            nextMonth.setMonth(nextMonth.getMonth() + interval);
            const firstDay = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
            const targetDay = (pattern.week - 1) * 7 + (pattern.day - firstDay.getDay() + 7) % 7 + 1;
            const newDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), targetDay);
            // Ensure we don't go backwards in time
            if (newDate > currentDate) {
              currentDate = newDate;
            } else {
              currentDate.setMonth(currentDate.getMonth() + interval);
            }
          } else {
            // Same day of month
            currentDate.setMonth(currentDate.getMonth() + interval);
          }
          break;
        
        case 'yearly':
          currentDate.setFullYear(currentDate.getFullYear() + interval);
          break;
      }
    }

    set({ previewDates: dates });
  },
})); 