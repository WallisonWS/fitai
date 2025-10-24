"use client";

import React from 'react';

interface WeekDay {
  day: string;
  date: number;
  isToday: boolean;
  hasData: boolean;
}

interface WeekCalendarProps {
  days?: WeekDay[];
}

const defaultDays: WeekDay[] = [
  { day: 'T', date: 15, isToday: false, hasData: false },
  { day: 'Q', date: 16, isToday: false, hasData: false },
  { day: 'Q', date: 17, isToday: false, hasData: false },
  { day: 'S', date: 18, isToday: false, hasData: false },
  { day: 'S', date: 19, isToday: false, hasData: false },
  { day: 'D', date: 20, isToday: true, hasData: true },
  { day: 'S', date: 21, isToday: false, hasData: false },
];

export function WeekCalendar({ days = defaultDays }: WeekCalendarProps) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3">
      {days.map((day, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center w-10 h-12 rounded-lg transition-all ${
            day.isToday
              ? 'bg-black text-white'
              : day.hasData
              ? 'bg-gray-200 text-gray-700'
              : 'bg-transparent text-gray-400'
          }`}
        >
          <span className="text-xs font-medium mb-0.5">{day.day}</span>
          <span className="text-sm font-semibold">{day.date}</span>
        </div>
      ))}
    </div>
  );
}

