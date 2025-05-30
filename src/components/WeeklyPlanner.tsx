// src/components/WeeklyPlanner.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Calendar, Trophy, Target, TrendingUp } from 'lucide-react';
import { WeeklyPlannerProps, TaskCompletionState, WeekDay } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getCurrentDay, isTimeForWeeklyReset, getNextResetTime, getWeekProgress } from '@/utils/dateUtils';
import { getAllTaskIds } from '@/data/routineData';
import DaySchedule from './DaySchedule';
import ResetButton from './ResetButton';
import Clock from './Clock';

const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({ routine }) => {
  const { value: completedTasks, setValue: setCompletedTasks } = useLocalStorage<TaskCompletionState>('weeklyRoutineProgress', {});
  const { value: lastResetCheck, setValue: setLastResetCheck } = useLocalStorage<string>('lastResetCheck', '');
  const [isResetting, setIsResetting] = useState(false);
  const [weekProgress, setWeekProgress] = useState(0);

  const currentDay = getCurrentDay();
  const allTaskIds = getAllTaskIds();
  const totalTasks = allTaskIds.length;
  const completedCount = allTaskIds.filter(id => completedTasks[id]).length;
  const overallProgress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  // Auto-reset functionality
  const checkForWeeklyReset = useCallback(() => {
    const now = new Date().toISOString();
    const today = now.split('T')[0]; // Get date part only
    
    if (isTimeForWeeklyReset() && lastResetCheck !== today) {
      console.log('Auto-resetting weekly routine...');
      setCompletedTasks({});
      setLastResetCheck(today);
    }
  }, [lastResetCheck, setCompletedTasks, setLastResetCheck]);

  // Update week progress
  useEffect(() => {
    const updateProgress = () => {
      setWeekProgress(getWeekProgress());
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Check for reset every minute
  useEffect(() => {
    checkForWeeklyReset();
    const interval = setInterval(checkForWeeklyReset, 60000);
    return () => clearInterval(interval);
  }, [checkForWeeklyReset]);

  const handleTaskToggle = (taskId: string) => {
    setCompletedTasks((prev: TaskCompletionState) => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleManualReset = async () => {
    setIsResetting(true);
    
    // Simulate async operation for better UX
    setTimeout(() => {
      setCompletedTasks({});
      setLastResetCheck(new Date().toISOString().split('T')[0]);
      setIsResetting(false);
    }, 1000);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600 dark:text-green-400';
    if (progress >= 60) return 'text-blue-600 dark:text-blue-400';
    if (progress >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const daysOrder: WeekDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Weekly Routine Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Stay organized and track your daily progress
          </p>
        </div>

        {/* Top Stats and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Live Clock */}
          <Clock className="lg:col-span-1" />
          
          {/* Overall Progress */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Overall Progress
                </h2>
              </div>
              <span className="text-2xl">🎯</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {overallProgress.toFixed(1)}%
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {completedCount}/{totalTasks} tasks
                </span>
              </div>
              
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={`${getProgressBgColor(overallProgress)} rounded-full h-3 transition-all duration-700 ease-out`}
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              
              <div className={`text-sm font-medium ${getProgressColor(overallProgress)}`}>
                {overallProgress >= 80 ? 'Excellent!' : 
                 overallProgress >= 60 ? 'Good progress!' : 
                 overallProgress >= 40 ? 'Keep going!' : 'Just getting started!'}
              </div>
            </div>
          </div>

          {/* Week Progress & Reset */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Week Progress
                </h2>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {weekProgress.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Week Complete
                </div>
              </div>
              
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${weekProgress}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                Next reset: {getNextResetTime()}
              </div>
              
              <ResetButton onReset={handleManualReset} isResetting={isResetting} />
            </div>
          </div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {daysOrder.map((day) => (
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
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            Routine automatically resets every Sunday at 12:01 AM
          </p>
          <p className="text-xs mt-2">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner;