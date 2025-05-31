// src/components/WeeklyPlanner.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for day schedule cards to enable smooth scrolling
  const dayRefs = useRef<Record<WeekDay, HTMLDivElement | null>>({
    Sunday: null,
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
    Saturday: null,
  });

  // Scroll handler for header minimization
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Handle day navigation click with smooth scrolling
  const handleDayClick = useCallback((day: WeekDay) => {
    const dayElement = dayRefs.current[day];
    if (dayElement) {
      // Account for sticky header height
      const headerHeight = isScrolled ? 80 : 120;
      const elementTop = dayElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
      
      // Add a subtle highlight effect
      dayElement.classList.add('animate-pulse');
      setTimeout(() => {
        dayElement.classList.remove('animate-pulse');
      }, 1000);
    }
  }, [isScrolled]);

  const days: WeekDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Calculate overall progress
  const allTasks = Object.values(routine).flat();
  const completedCount = allTasks.filter(task => completedTasks[task.id]).length;
  const totalTasks = allTasks.length;
  const overallProgress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <div className="relative">
      {/* Sticky Header with Day Navigation */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* App Title */}
            <div className={`flex items-center space-x-4 transition-all duration-300 ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}>
              <h1 className={`font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-2xl'
              }`}>
                Puneeth&apos;s Weekly Routine
              </h1>
              {isScrolled && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {completedCount}/{totalTasks} tasks • {overallProgress.toFixed(0)}%
                </div>
              )}
            </div>

            {/* Compact Day Navigation */}
            <div className={`transition-all duration-300 ${
              isScrolled ? 'scale-95' : 'scale-100'
            }`}>
              <div className="flex items-center space-x-1">
                {days.map((day) => {
                  const isCurrentDay = day === currentDay;
                  const dayTasks = routine[day] || [];
                  const dayCompleted = dayTasks.filter(task => completedTasks[task.id]).length;
                  const dayTotal = dayTasks.length;
                  const dayProgress = dayTotal > 0 ? (dayCompleted / dayTotal) * 100 : 0;
                  const isDayCompleted = dayProgress === 100;
                  
                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`relative ${isScrolled ? 'p-2' : 'p-3'} rounded-xl font-medium text-xs transition-all duration-200 hover:scale-105 active:scale-95 ${
                        isCurrentDay
                          ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-lg'
                          : isDayCompleted
                          ? 'bg-gradient-to-b from-green-500 to-green-600 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      title={`${day}: ${dayCompleted}/${dayTotal} tasks (${dayProgress.toFixed(0)}%)`}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <span className="font-bold">
                          {day.slice(0, isScrolled ? 1 : 3).toUpperCase()}
                        </span>
                        
                        {!isScrolled && (
                          <>
                            {/* Progress indicator */}
                            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${
                                  isCurrentDay || isDayCompleted ? 'bg-white' : 'bg-blue-500'
                                }`}
                                style={{ width: `${dayProgress}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium opacity-90">
                              {Math.round(dayProgress)}%
                            </span>
                          </>
                        )}
                      </div>
                      
                      {/* Current day indicator */}
                      {isCurrentDay && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                      )}
                      
                      {/* Completion badge */}
                      {isDayCompleted && !isCurrentDay && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with top padding to account for sticky header */}
      <div className={`transition-all duration-300 ${isScrolled ? 'pt-20' : 'pt-28'}`}>
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
              <div
                key={day}
                ref={(el) => {
                  dayRefs.current[day] = el;
                }}
                className="transition-all duration-300"
              >
                <DaySchedule
                  day={day}
                  tasks={routine[day]}
                  completedTasks={completedTasks}
                  onTaskToggle={handleTaskToggle}
                  isCurrentDay={day === currentDay}
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center py-8">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Routine automatically resets every every week
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Stay consistent, stay productive! 🚀
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner;