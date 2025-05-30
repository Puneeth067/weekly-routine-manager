// src/components/WeeklyPlanner.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { WeeklyPlannerProps, TaskCompletionState, WeekDay } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getCurrentDay, isTimeForWeeklyReset, getWeekProgress } from '@/utils/dateUtils';
import { getAllTaskIds } from '@/data/routineData';
import DaySchedule from './DaySchedule';
import ResetButton from './ResetButton';
import Clock from './Clock';
import StudyRoadmap from './StudyRoadmap';

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({ routine }) => {
  const { storedValue: completedTasks, setValue: setCompletedTasks } = useLocalStorage<TaskCompletionState>(
    'weekly-routine-completed-tasks',
    {}
  );

  const { storedValue: lastResetDate, setValue: setLastResetDate } = useLocalStorage<string>(
    'weekly-routine-last-reset',
    ''
  );

  const [currentDay, setCurrentDay] = useState<WeekDay>('Monday');
  const [weekProgress, setWeekProgress] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  // Update current day and week progress
  useEffect(() => {
    const updateDayAndProgress = () => {
      setCurrentDay(getCurrentDay());
      setWeekProgress(getWeekProgress());
    };

    updateDayAndProgress();
    const interval = setInterval(updateDayAndProgress, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto reset functionality
  useEffect(() => {
    const checkForAutoReset = () => {
      const now = new Date();
      const today = now.toDateString();
      
      if (isTimeForWeeklyReset() && lastResetDate !== today) {
        handleReset(true);
      }
    };

    const interval = setInterval(checkForAutoReset, 60000); // Check every minute
    checkForAutoReset(); // Check immediately

    return () => clearInterval(interval);
  }, [lastResetDate]);

  const handleReset = useCallback((isAutoReset = false) => {
    setIsResetting(true);
    
    const allTaskIds = getAllTaskIds();
    const resetState: TaskCompletionState = {};
    
    allTaskIds.forEach(taskId => {
      resetState[taskId] = false;
    });

    setCompletedTasks(resetState);
    setLastResetDate(new Date().toDateString());
    
    // Show visual feedback for manual reset
    if (!isAutoReset) {
      setTimeout(() => setIsResetting(false), 1000);
    } else {
      setIsResetting(false);
    }
  }, [setCompletedTasks, setLastResetDate]);

  const handleTaskToggle = useCallback((taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  }, [setCompletedTasks]);

  const days: WeekDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Calculate overall progress
  const allTasks = Object.values(routine).flat();
  const completedCount = allTasks.filter(task => completedTasks[task.id]).length;
  const totalTasks = allTasks.length;
  const overallProgress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header with Clock and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Clock className="w-full" />
        </div>
        <div className="space-y-4">
          <ResetButton onReset={() => handleReset(false)} isResetting={isResetting} />
          
          {/* Overall Progress */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-green-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Weekly Progress
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tasks Completed</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {completedCount}/{totalTasks}
                </span>
              </div>
              <div className="bg-white/50 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full h-3 transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {overallProgress.toFixed(1)}%
                </span>
              </div>
              
              {/* Week Timeline */}
              <div className="mt-4 pt-4 border-t border-green-200 dark:border-gray-600">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>Week Progress</span>
                  <span>{weekProgress.toFixed(1)}%</span>
                </div>
                <div className="bg-white/50 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-full h-2 transition-all duration-300"
                    style={{ width: `${weekProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Study Roadmap Section */}
      <StudyRoadmap />

      {/* Weekly Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {days.map((day) => (
          <DaySchedule
            key={day}
            day={day}
            tasks={routine[day]}
            completedTasks={completedTasks}
            onTaskToggle={handleTaskToggle}
            isCurrentDay={day === currentDay}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Routine automatically resets every Sunday at 12:01 AM
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          Stay consistent, stay productive! 🚀
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner;