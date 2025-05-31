// src/app/page.tsx
import WeeklyPlanner from '@/components/WeeklyPlanner';
import { weeklyRoutine } from '@/data/routineData';

export default function Home() {
  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Weekly Planner Component */}
        <WeeklyPlanner routine={weeklyRoutine} />
      </div>
    </main>
  );
}