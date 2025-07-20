import RecurringDatePicker from '@/components/RecurringDatePicker';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Recurring Date Picker Test</h1>
        <RecurringDatePicker />
      </div>
    </div>
  );
} 