// src/app/page.tsx
import WeeklyPlanner from '@/components/WeeklyPlanner';
import { weeklyRoutine } from '@/data/routineData';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Weekly Routine Manager</h1>
        <WeeklyPlanner routine={weeklyRoutine} />
      </div>
    </div>
  