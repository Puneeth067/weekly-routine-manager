// src/types/index.ts

export interface RoutineTask {
  id: string;
  time: string;
  activity: string;
  emoji: string;
}

export interface DayRoutine {
  [key: string]: RoutineTask[];
}

export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface WeeklyRoutine {
  Monday: RoutineTask[];
  Tuesday: RoutineTask[];
  Wednesday: RoutineTask[];
  Thursday: RoutineTask[];
  Friday: RoutineTask[];
  Saturday: RoutineTask[];
  Sunday: RoutineTask[];
}

export interface TaskCompletionState {
  [taskId: string]: boolean;
}

export interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
  date: string;
  day: string;
  ampm: string;
}

export interface ResetButtonProps {
  onReset: () => void;
  isResetting?: boolean;
}

export interface DayScheduleProps {
  day: WeekDay;
  tasks: RoutineTask[];
  completedTasks: TaskCompletionState;
  onTaskToggle: (taskId: string) => void;
  isCurrentDay?: boolean;
}

export interface WeeklyPlannerProps {
  routine: WeeklyRoutine;
}

export interface ClockProps {
  className?: string;
}

export interface UseLocalStorageReturn<T> {
  storedValue: T;
  setValue: (value: T | ((val: T) => T)) => void;
  removeValue: () => void;
}