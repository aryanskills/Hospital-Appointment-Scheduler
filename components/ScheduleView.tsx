'use client';

import { useState } from 'react';
import DoctorSelector from './DoctorSelector';
import DayView from './DayView';
import WeekView from './WeekView';

type ViewType = 'day' | 'week';

export default function ScheduleView() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<ViewType>('day');

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (dateString: string) => {
    setSelectedDate(new Date(dateString));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Hospital Appointment Scheduler
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Doctor Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Doctor
            </label>
            <DoctorSelector
              selectedDoctorId={selectedDoctorId}
              onDoctorChange={setSelectedDoctorId}
            />
          </div>
          
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={formatDateForInput(selectedDate)}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* View Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View Type
            </label>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewType('day')}
                className={`flex-1 py-3 px-4 text-sm font-medium ${
                  viewType === 'day'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Day View
              </button>
              <button
                onClick={() => setViewType('week')}
                className={`flex-1 py-3 px-4 text-sm font-medium ${
                  viewType === 'week'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Week View
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Views */}
      <div className="space-y-4">
        {viewType === 'day' ? (
          <DayView doctorId={selectedDoctorId} selectedDate={selectedDate} />
        ) : (
          <WeekView doctorId={selectedDoctorId} selectedDate={selectedDate} />
        )}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Types</h3>
        <div className="flex flex-wrap gap-4">
          {[
            { type: 'checkup', color: '#3b82f6', label: 'Checkup' },
            { type: 'consultation', color: '#10b981', label: 'Consultation' },
            { type: 'follow-up', color: '#f59e0b', label: 'Follow-up' },
            { type: 'procedure', color: '#8b5cf6', label: 'Procedure' }
          ].map(({ type, color, label }) => (
            <div key={type} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-sm text-gray-700">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
