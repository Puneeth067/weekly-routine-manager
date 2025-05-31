// src/components/DayNavigation.tsx
'use client';

import { WeekDay, WeeklyRoutine } from '@/types';

interface DayNavigationProps {
  currentDay: WeekDay;
  onDayClick: (day: WeekDay) => void;
  completedTasks: Record<string, boolean>;
  routine: WeeklyRoutine;
}

const DayNavigation: React.FC<DayNavigationProps> = ({
  currentDay,
  onDayClick,
  completedTasks,
  routine
}) => {
  const days: WeekDay[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const getDayProgress = (day: WeekDay) => {
    const dayTasks = routine[day] || [];
    if (dayTasks.length === 0) return 0;
    
    const completed = dayTasks.filter(task => completedTasks[task.id]).length;
    return (completed / dayTasks.length) * 100;
  };

  const getDayAbbreviation = (day: WeekDay) => {
    return day.slice(0, 3).toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Quick Navigation
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Jump to day
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const isCurrentDay = day === currentDay;
          const progress = getDayProgress(day);
          const isCompleted = progress === 100;
          
          return (
            <button
              key={day}
              onClick={() => onDayClick(day)}
              className={`relative p-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-105 active:scale-95 ${
                isCurrentDay
                  ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-lg ring-2 ring-blue-200 dark:ring-blue-700'
                  : isCompleted
                  ? 'bg-gradient-to-b from-green-500 to-green-600 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="font-bold text-xs">
                  {getDayAbbreviation(day)}
                </span>
                
                {/* Progress indicator */}
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isCurrentDay
                        ? 'bg-white'
                        : isCompleted
                        ? 'bg-white'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <span className="text-xs font-medium opacity-90">
                  {Math.round(progress)}%
                </span>
              </div>
              
              {/* Current day indicator */}
              {isCurrentDay && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
              )}
              
              {/* Completion badge */}
              {isCompleted && !isCurrentDay && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800" />
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
        Click any day to scroll to its schedule
      </div>
    </div>
  );
};

export default DayNavigation;