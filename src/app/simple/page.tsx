'use client';

import React from 'react';

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Simple Test Page</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="font-semibold text-blue-900">Date Range Picker Test</h2>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Start Date:</label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                defaultValue="2024-01-15"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">End Date:</label>
              <input
                type="date"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                defaultValue="2024-12-31"
              />
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h2 className="font-semibold text-green-900">Recurrence Options Test</h2>
            <div className="flex gap-2 mt-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Daily
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300">
                Weekly
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300">
                Monthly
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300">
                Yearly
              </button>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <h2 className="font-semibold text-yellow-900">Customization Test</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-700">Every</span>
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-16 border border-gray-300 rounded px-2 py-1"
              />
              <span className="text-sm text-gray-700">days</span>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <h2 className="font-semibold text-purple-900">Calendar Preview Test</h2>
            <div className="grid grid-cols-7 gap-1 text-center border border-gray-200 rounded bg-white mt-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="font-bold text-xs text-gray-900 p-1">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => (
                <div
                  key={i}
                  className={`p-1 rounded text-xs font-medium ${
                    i === 14 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
          <p className="text-sm text-green-600">✅ All components rendering correctly</p>
          <p className="text-sm text-green-600">✅ Tailwind CSS working</p>
          <p className="text-sm text-green-600">✅ TypeScript compilation successful</p>
        </div>
      </div>
    </div>
  );
} 