// src/components/Clock.tsx
'use client';

import { useState, useEffect } from 'react';
import { Clock as ClockIcon, Calendar } from 'lucide-react';
import { ClockProps, ClockTime } from '@/types';
import { formatTime, formatDisplayTime } from '@/utils/dateUtils';

const Clock: React.FC<ClockProps> = ({ className = '' }) => {
  const [time, setTime] = useState<ClockTime>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: '',
    day: '',
    ampm: 'AM',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeData = formatTime(now);
      setTime(timeData);
    };

    // Update immediately
    updateTime();

    // Set up interval to update every second
    const interval = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const timeString = formatDisplayTime(time.hours, time.minutes, time.seconds);

  return (
    <div className={`bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-blue-200 dark:border-gray-700 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Live Clock
          </h2>
        </div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      <div className="text-center space-y-3">
        <div className="font-mono text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-wider">
          {timeString}
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">
            {time.date}
          </span>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-500 bg-white dark:bg-gray-800 px-3 py-1 rounded-full inline-block">
          Running 24/7
        </div>
      </div>
    </div>
  );
};

export default Clock;