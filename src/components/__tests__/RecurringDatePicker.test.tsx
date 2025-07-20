import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecurringDatePicker from '../RecurringDatePicker';
import { useRecurrenceStore } from '../recurrenceStore';

// Mock the store to reset state between tests
const mockStore = {
  startDate: null,
  endDate: null,
  recurrenceType: 'daily' as const,
  interval: 1,
  daysOfWeek: [],
  pattern: null,
  previewDates: [],
  setStartDate: jest.fn(),
  setEndDate: jest.fn(),
  setRecurrenceType: jest.fn(),
  setInterval: jest.fn(),
  setDaysOfWeek: jest.fn(),
  setPattern: jest.fn(),
  generatePreview: jest.fn(),
};

// Mock the Zustand store
jest.mock('../recurrenceStore', () => ({
  useRecurrenceStore: jest.fn((selector) => {
    const state = mockStore;
    return selector(state);
  }),
}));

describe('RecurringDatePicker Integration Tests', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    Object.assign(mockStore, {
      startDate: null,
      endDate: null,
      recurrenceType: 'daily' as const,
      interval: 1,
      daysOfWeek: [],
      pattern: null,
      previewDates: [],
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
      setRecurrenceType: jest.fn(),
      setInterval: jest.fn(),
      setDaysOfWeek: jest.fn(),
      setPattern: jest.fn(),
      generatePreview: jest.fn(),
    });
  });

  describe('Component Rendering', () => {
    it('renders all main sections', () => {
      render(<RecurringDatePicker />);
      
      expect(screen.getByText('Recurring Date Picker')).toBeInTheDocument();
      expect(screen.getByText('Date Range')).toBeInTheDocument();
      expect(screen.getByText('Recurrence')).toBeInTheDocument();
      expect(screen.getByText('Customization')).toBeInTheDocument();
      expect(screen.getByText('Preview')).toBeInTheDocument();
      expect(screen.getByText('Generated Dates')).toBeInTheDocument();
    });

    it('shows initial state correctly', () => {
      render(<RecurringDatePicker />);
      
      // Should show placeholder text when no start date is set
      expect(screen.getByText('Please select a start date to see the preview.')).toBeInTheDocument();
      
      // Should show daily as default recurrence type
      expect(screen.getByRole('button', { name: 'Daily', pressed: true })).toBeInTheDocument();
    });
  });

  describe('Date Range Selection', () => {
    it('allows setting start date', async () => {
      const user = userEvent.setup();
      render(<RecurringDatePicker />);
      
      const startDateInput = screen.getByLabelText(/start/i);
      await user.type(startDateInput, '2024-01-15');
      
      expect(mockStore.setStartDate).toHaveBeenCalledWith(new Date('2024-01-15'));
    });

    it('allows setting end date', async () => {
      const user = userEvent.setup();
      render(<RecurringDatePicker />);
      
      const endDateInput = screen.getByLabelText(/end/i);
      await user.type(endDateInput, '2024-12-31');
      
      expect(mockStore.setEndDate).toHaveBeenCalledWith(new Date('2024-12-31'));
    });

    it('validates end date is after start date', async () => {
      const user = userEvent.setup();
      render(<RecurringDatePicker />);
      
      const startDateInput = screen.getByLabelText(/start/i);
      const endDateInput = screen.getByLabelText(/end/i);
      
      await user.type(startDateInput, '2024-01-15');
      await user.type(endDateInput, '2024-01-10'); // Before start date
      
      // The input should have min attribute set
      expect(endDateInput).toHaveAttribute('min', '2024-01-15');
    });
  });

  describe('Recurrence Type Selection', () => {
    it('allows switching between recurrence types', async () => {
      const user = userEvent.setup();
      render(<RecurringDatePicker />);
      
      const weeklyButton = screen.getByRole('button', { name: 'Weekly' });
      await user.click(weeklyButton);
      
      expect(mockStore.setRecurrenceType).toHaveBeenCalledWith('weekly');
    });

    it('shows correct active state for selected type', () => {
      mockStore.recurrenceType = 'weekly';
      render(<RecurringDatePicker />);
      
      expect(screen.getByRole('button', { name: 'Weekly', pressed: true })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Daily', pressed: false })).toBeInTheDocument();
    });
  });

  describe('Customization Options', () => {
    it('allows changing interval for daily recurrence', async () => {
      const user = userEvent.setup();
      render(<RecurringDatePicker />);
      
      const intervalInput = screen.getByDisplayValue('1');
      await user.clear(intervalInput);
      await user.type(intervalInput, '3');
      
      expect(mockStore.setInterval).toHaveBeenCalledWith(3);
    });

    it('shows day selection for weekly recurrence', async () => {
      mockStore.recurrenceType = 'weekly';
      const user = userEvent.setup();
      render(<RecurringDatePicker />);
      
      // Should show day selection buttons
      expect(screen.getByText('Sun')).toBeInTheDocument();
      expect(screen.getByText('Mon')).toBeInTheDocument();
      expect(screen.getByText('Tue')).toBeInTheDocument();
      
      // Should show helper text when no days selected
      expect(screen.getByText('Select days of the week for weekly recurrence')).toBeInTheDocument();
      
      // Click on Monday
      const mondayButton = screen.getByRole('button', { name: 'Mon', pressed: false });
      await user.click(mondayButton);
      
      expect(mockStore.setDaysOfWeek).toHaveBeenCalledWith([1]);
    });

    it('shows pattern selection for monthly recurrence', async () => {
      mockStore.recurrenceType = 'monthly';
      const user = userEvent.setup();
      render(<RecurringDatePicker />);
      
      // Should show pattern selection dropdowns
      expect(screen.getByText('The')).toBeInTheDocument();
      expect(screen.getByText('of the month')).toBeInTheDocument();
      
      // Select "Second Tuesday"
      const weekSelect = screen.getByDisplayValue('--');
      const daySelect = screen.getByDisplayValue('--');
      
      await user.selectOptions(weekSelect, '2');
      await user.selectOptions(daySelect, '2'); // Tuesday
      
      expect(mockStore.setPattern).toHaveBeenCalledWith({ week: 2, day: 2 });
    });
  });

  describe('Preview Generation', () => {
    it('generates preview when start date is set', async () => {
      mockStore.startDate = new Date('2024-01-15');
      mockStore.previewDates = [
        new Date('2024-01-15'),
        new Date('2024-01-16'),
        new Date('2024-01-17'),
      ];
      
      render(<RecurringDatePicker />);
      
      expect(screen.getByText('Generated dates based on your configuration:')).toBeInTheDocument();
      expect(screen.getByText('Monday, January 15, 2024')).toBeInTheDocument();
      expect(screen.getByText('Tuesday, January 16, 2024')).toBeInTheDocument();
      expect(screen.getByText('Wednesday, January 17, 2024')).toBeInTheDocument();
    });

    it('shows message when no dates are generated', () => {
      mockStore.startDate = new Date('2024-01-15');
      mockStore.previewDates = [];
      
      render(<RecurringDatePicker />);
      
      expect(screen.getByText('No dates generated yet. Please configure your recurrence options.')).toBeInTheDocument();
    });

    it('limits displayed dates to 20 with overflow message', () => {
      mockStore.startDate = new Date('2024-01-15');
      mockStore.previewDates = Array.from({ length: 25 }, (_, i) => 
        new Date(2024, 0, 15 + i)
      );
      
      render(<RecurringDatePicker />);
      
      // Should show first 20 dates
      expect(screen.getByText('Monday, January 15, 2024')).toBeInTheDocument();
      expect(screen.getByText('Thursday, February 8, 2024')).toBeInTheDocument();
      
      // Should show overflow message
      expect(screen.getByText('... and 5 more dates')).toBeInTheDocument();
    });
  });

  describe('Calendar Preview', () => {
    it('shows calendar with navigation', () => {
      render(<RecurringDatePicker />);
      
      expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
      expect(screen.getByLabelText('Next month')).toBeInTheDocument();
      expect(screen.getByText('January 2024')).toBeInTheDocument();
    });

    it('highlights preview dates in calendar', () => {
      mockStore.previewDates = [new Date('2024-01-15')];
      render(<RecurringDatePicker />);
      
      // The date should be highlighted (blue background)
      const dateElement = screen.getByText('15');
      expect(dateElement).toHaveClass('bg-blue-500');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(<RecurringDatePicker />);
      
      // Check for proper button roles
      expect(screen.getByRole('button', { name: 'Daily' })).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByRole('button', { name: 'Weekly' })).toHaveAttribute('aria-pressed', 'false');
      
      // Check for navigation labels
      expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
      expect(screen.getByLabelText('Next month')).toBeInTheDocument();
    });

    it('has proper form labels', () => {
      render(<RecurringDatePicker />);
      
      expect(screen.getByLabelText(/start/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/end/i)).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    it('calls generatePreview when relevant state changes', () => {
      render(<RecurringDatePicker />);
      
      // The useEffect should call generatePreview
      expect(mockStore.generatePreview).toHaveBeenCalled();
    });

    it('updates preview when recurrence type changes', async () => {
      const user = userEvent.setup();
      render(<RecurringDatePicker />);
      
      const weeklyButton = screen.getByRole('button', { name: 'Weekly' });
      await user.click(weeklyButton);
      
      // Should call generatePreview after state change
      expect(mockStore.generatePreview).toHaveBeenCalled();
    });
  });
}); 