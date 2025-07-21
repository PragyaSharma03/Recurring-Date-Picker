# Recurring Date Picker
A powerful React application for creating and managing recurring date patterns. Built with Next.js, TypeScript, and Zustand for state management.
Gitpod Link: https://pragyasharm-recurringda-h2z05ib0lpt.ws-us120.gitpod.io/
run npm dev

Snapshots showcasing all features:
<img width="1218" height="683" alt="image" src="https://github.com/user-attachments/assets/9a4684bf-136c-4a98-bc0b-071538a93d69" />

<img width="1261" height="683" alt="image" src="https://github.com/user-attachments/assets/b4730d93-55b2-412b-a1a0-8e0e799d8bfe" />



## Features

- **Date Range Selection**: Choose start and optional end dates
- **Multiple Recurrence Types**: Daily, weekly, monthly, and yearly patterns
- **Custom Intervals**: Set custom intervals for any recurrence type
- **Weekly Day Selection**: Choose specific days of the week for weekly recurrence
- **Monthly Patterns**: Support for "nth day of month" patterns (e.g., 2nd Tuesday)
- **Live Preview**: Real-time calendar preview of generated dates
- **Generated Date List**: View all generated dates in a readable format

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd recurring-date-picker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Select a Start Date**: Choose when your recurring pattern should begin
2. **Choose Recurrence Type**: Select from daily, weekly, monthly, or yearly
3. **Configure Options**:
   - Set the interval (every X days/weeks/months/years)
   - For weekly: Select specific days of the week
   - For monthly: Choose "nth day of month" pattern
4. **View Preview**: See generated dates in the calendar preview and list

## Technology Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Zustand**: Lightweight state management
- **Tailwind CSS**: Utility-first CSS framework
- **React 19**: Latest React features

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
└── components/            # React components
    ├── RecurringDatePicker.tsx    # Main component
    ├── DateRangePicker.tsx        # Date selection
    ├── RecurrenceOptions.tsx      # Recurrence type selection
    ├── CustomRecurrence.tsx       # Advanced options
    ├── MiniCalendarPreview.tsx    # Calendar preview
    └── recurrenceStore.ts         # Zustand store
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint




