// src/utils/dateUtils.ts
import { WeekDay } from '@/types';

export const getCurrentDay = (): WeekDay => {
  const days: WeekDay[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  return days[today.getDay()];
};

export const formatTime = (date: Date) => {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    date: date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    day: date.toLocaleDateString('en-US', { weekday: 'long' }),
    ampm: date.getHours() >= 12 ? 'PM' : 'AM',
  };
};

export const formatDisplayTime = (hours: number, minutes: number, seconds: number): string => {
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  return `${displayHours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
};

export const isTimeForWeeklyReset = (): boolean => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  
  // Check if it's Sunday at 00:01 AM
  return day === 0 && hours === 0 && minutes === 1;
};

export const getNextResetTime = (): string => {
  const now = new Date();
  const nextSunday = new Date();
  
  // Calculate days until next Sunday
  const daysUntilSunday = (7 - now.getDay()) % 7;
  nextSunday.setDate(now.getDate() + daysUntilSunday);
  nextSunday.setHours(0, 1, 0, 0); // Set to 00:01 AM
  
  // If it's already Sunday and past 00:01, set to next Sunday
  if (daysUntilSunday === 0 && (now.getHours() > 0 || (now.getHours() === 0 && now.getMinutes() > 1))) {
    nextSunday.setDate(nextSunday.getDate() + 7);
  }
  
  return nextSunday.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getWeekProgress = (): number => {
  const now = new Date();
  const startOfWeek = new Date(now);
  
  // Get the most recent Sunday
  const daysSinceSunday = now.getDay();
  startOfWeek.setDate(now.getDate() - daysSinceSunday);
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  
  const totalWeekTime = endOfWeek.getTime() - startOfWeek.getTime();
  const elapsedTime = now.getTime() - startOfWeek.getTime();
  
  return Math.min(100, Math.max(0, (elapsedTime / totalWeekTime) * 100));
};