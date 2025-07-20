# Recurring Date Picker API Documentation

## Overview

The Recurring Date Picker is a React application that provides a comprehensive interface for creating and managing recurring date patterns. It consists of several components and a centralized state management store.

## Components

### RecurringDatePicker

The main component that orchestrates all sub-components and provides the complete interface.

**Props:** None

**Features:**
- Date range selection
- Recurrence type selection
- Custom interval configuration
- Weekly day selection
- Monthly pattern configuration
- Live calendar preview
- Generated date list

**Example:**
```tsx
import RecurringDatePicker from '@/components/RecurringDatePicker';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <RecurringDatePicker />
    </div>
  );
}
```

### DateRangePicker

Component for selecting start and end dates for the recurring pattern.

**Props:** None

**State Dependencies:**
- `startDate: Date | null` - Start date for the pattern
- `endDate: Date | null` - Optional end date for the pattern

**Actions:**
- `setStartDate(date: Date | null)` - Sets the start date
- `setEndDate(date: Date | null)` - Sets the end date

**Features:**
- HTML5 date inputs
- Automatic validation (end date must be after start date)
- Required start date, optional end date

### RecurrenceOptions

Component for selecting the type of recurrence pattern.

**Props:** None

**State Dependencies:**
- `recurrenceType: RecurrenceType` - Current recurrence type

**Actions:**
- `setRecurrenceType(type: RecurrenceType)` - Sets the recurrence type

**Available Types:**
- `'daily'` - Daily recurrence
- `'weekly'` - Weekly recurrence
- `'monthly'` - Monthly recurrence
- `'yearly'` - Yearly recurrence

### CustomRecurrence

Component for configuring advanced recurrence options based on the selected type.

**Props:** None

**State Dependencies:**
- `recurrenceType: RecurrenceType` - Current recurrence type
- `interval: number` - Interval between occurrences
- `daysOfWeek: number[]` - Selected days for weekly recurrence
- `pattern: RecurrencePattern | null` - Monthly pattern configuration

**Actions:**
- `setInterval(interval: number)` - Sets the interval
- `setDaysOfWeek(days: number[])` - Sets selected days of week
- `setPattern(pattern: RecurrencePattern | null)` - Sets monthly pattern

**Features by Type:**

#### Daily
- Interval input (every X days)

#### Weekly
- Interval input (every X weeks)
- Day of week selection buttons (Sun-Sat)
- Helper text when no days selected

#### Monthly
- Interval input (every X months)
- Pattern selection for "nth day of month"
  - Week selection (1st, 2nd, 3rd, 4th, 5th)
  - Day selection (Sun-Sat)

#### Yearly
- Interval input (every X years)

### MiniCalendarPreview

Component for displaying a mini calendar with preview dates highlighted.

**Props:** None

**State Dependencies:**
- `previewDates: Date[]` - Generated preview dates
- `startDate: Date | null` - Start date for initial calendar view

**Features:**
- Month-by-month navigation
- Highlighted dates that match the current pattern
- Responsive calendar grid
- Accessibility labels for navigation

## State Management (Zustand Store)

### useRecurrenceStore

The central state management store using Zustand.

**Types:**

```typescript
type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RecurrencePattern {
  week?: number;  // 1-5 (1st, 2nd, 3rd, 4th, 5th week)
  day?: number;   // 0-6 (Sunday = 0, Monday = 1, etc.)
}

interface RecurrenceStore {
  // State
  startDate: Date | null;
  endDate: Date | null;
  recurrenceType: RecurrenceType;
  interval: number;
  daysOfWeek: number[];
  pattern: RecurrencePattern | null;
  previewDates: Date[];
  
  // Actions
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setRecurrenceType: (type: RecurrenceType) => void;
  setInterval: (interval: number) => void;
  setDaysOfWeek: (days: number[]) => void;
  setPattern: (pattern: RecurrencePattern | null) => void;
  generatePreview: () => void;
}
```

**Usage:**
```tsx
import { useRecurrenceStore } from '@/components/recurrenceStore';

function MyComponent() {
  const startDate = useRecurrenceStore((s) => s.startDate);
  const setStartDate = useRecurrenceStore((s) => s.setStartDate);
  
  return (
    <input
      type="date"
      value={startDate?.toISOString().slice(0, 10) || ''}
      onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
    />
  );
}
```

### Date Generation Logic

The `generatePreview()` function calculates all dates that match the current pattern:

#### Daily Recurrence
- Adds `interval` days to each date
- Example: Every 2 days starting from 2024-01-15
  - 2024-01-15, 2024-01-17, 2024-01-19, ...

#### Weekly Recurrence
- If no specific days selected: adds `interval * 7` days
- If specific days selected: finds next occurrence of selected days
- Example: Every week on Monday, Wednesday, Friday
  - 2024-01-15 (Mon), 2024-01-17 (Wed), 2024-01-19 (Fri), 2024-01-22 (Mon), ...

#### Monthly Recurrence
- If no pattern: same day of month, adds `interval` months
- If pattern specified: calculates "nth day of month"
- Example: 2nd Tuesday of every month
  - 2024-01-09, 2024-02-13, 2024-03-12, ...

#### Yearly Recurrence
- Adds `interval` years to each date
- Example: Every year on January 15
  - 2024-01-15, 2025-01-15, 2026-01-15, ...

## Styling

The application uses Tailwind CSS for styling with the following design system:

### Colors
- Primary: Blue (`bg-blue-500`, `text-blue-500`)
- Background: Gray (`bg-gray-100`, `bg-gray-50`)
- Text: Gray (`text-gray-900`, `text-gray-600`)
- Borders: Gray (`border-gray-300`)

### Spacing
- Consistent spacing using Tailwind's spacing scale
- `mb-4` for component margins
- `p-6` for container padding
- `gap-2` for flex gaps

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Flexible container widths

## Accessibility

The application follows accessibility best practices:

### ARIA Labels
- Navigation buttons have `aria-label` attributes
- Toggle buttons use `aria-pressed` for state indication

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Proper focus management

### Screen Reader Support
- Semantic HTML structure
- Descriptive labels for form inputs
- Proper heading hierarchy

## Testing

The application includes comprehensive tests:

### Integration Tests
- Component rendering and interaction
- State management
- User interactions
- Accessibility features

### Unit Tests
- Store logic
- Date generation algorithms
- Edge cases and validation

### Test Commands
```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## Error Handling

The application handles various error scenarios:

### Date Validation
- End date must be after start date
- Invalid dates are prevented
- Graceful handling of edge cases

### State Validation
- Invalid intervals are handled
- Missing required fields show appropriate messages
- Pattern validation for monthly recurrence

### User Feedback
- Clear error messages
- Visual indicators for invalid states
- Helpful guidance text

## Performance Considerations

### Optimization Strategies
- Memoized selectors in Zustand store
- Efficient date calculations
- Limited preview date display (max 20 shown)
- Lazy loading of calendar months

### Memory Management
- Proper cleanup of date objects
- Efficient state updates
- Minimal re-renders through proper dependency arrays

## Browser Support

The application supports:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2017+ features
- CSS Grid and Flexbox
- HTML5 date inputs

## Dependencies

### Core Dependencies
- React 19.1.0
- Next.js 15.4.1
- Zustand 4.4.1

### Development Dependencies
- TypeScript 5
- Tailwind CSS 3.4.0
- Jest 30.0.4
- Testing Library 14.1.2

## Contributing

When contributing to the codebase:

1. Follow the existing code style and patterns
2. Add comprehensive JSDoc documentation
3. Write tests for new features
4. Ensure accessibility compliance
5. Update this documentation as needed 