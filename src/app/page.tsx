// src/app/page.tsx
import WeeklyPlanner from '@/components/WeeklyPlanner';
import { weeklyRoutine } from '@/data/routineData';

export default function Home() {
  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Weekly Routine Manager
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay organized and productive with your personalized weekly schedule. 
            Track your progress and maintain consistency across all days.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Auto-resets every Sunday at 12:01 AM
            </span>
          </div>
        </div>

        {/* Weekly Planner Component */}
        <WeeklyPlanner routine={weeklyRoutine} />
      </div>
    </main>
  );
}