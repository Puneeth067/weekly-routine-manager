// src/components/DaySchedule.tsx
'use client';

import { Check } from 'lucide-react';
import { DayScheduleProps } from '@/types';

const DaySchedule: React.FC<DayScheduleProps> = ({
  day,
  tasks,
  completedTasks,
  onTaskToggle,
  isCurrentDay = false,
}) => {
  const completedCount = tasks.filter(task => completedTasks[task.id]).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
      isCurrentDay 
        ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' 
        : 'border-gray-200 dark:border-gray-700'
    }`}>
      {/* Header */}
      <div className={`p-4 rounded-t-2xl ${
        isCurrentDay 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
          : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold">{day}</h3>
            {isCurrentDay && (
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                Today
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">
              {completedCount}/{totalTasks}
            </div>
            <div className="text-xs opacity-80">
              {completionPercentage.toFixed(0)}% Complete
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
        {tasks.map((task, index) => {
          const isCompleted = completedTasks[task.id];
          
          return (
            <div
              key={task.id}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:shadow-md ${
                isCompleted 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => onTaskToggle(task.id)}
                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                  isCompleted
                    ? 'bg-green-500 border-green-500 text-white scale-110'
                    : 'border-gray-300 dark:border-gray-500 hover:border-green-400 hover:scale-105'
                }`}
              >
                {isCompleted && <Check className="w-4 h-4" />}
              </button>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl flex-shrink-0">{task.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className={`font-medium text-sm ${
                      isCompleted 
                        ? 'text-green-800 dark:text-green-200 line-through' 
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {task.activity}
                    </div>
                    <div className={`text-xs mt-1 ${
                      isCompleted 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {task.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Completion indicator */}
              {isCompleted && (
                <div className="text-green-500 font-medium text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                  Done
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaySchedule;