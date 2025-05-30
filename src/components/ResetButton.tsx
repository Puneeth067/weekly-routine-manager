// src/components/ResetButton.tsx
'use client';

import { useState } from 'react';
import { RotateCcw, Clock } from 'lucide-react';
import { ResetButtonProps } from '@/types';
import { getNextResetTime } from '@/utils/dateUtils';

const ResetButton: React.FC<ResetButtonProps> = ({ onReset, isResetting = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const nextResetTime = getNextResetTime();

  const handleReset = async () => {
    setIsLoading(true);
    try {
      onReset();
      // Add a small delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error resetting tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow-lg border border-orange-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Weekly Reset
          </h2>
        </div>
        {isResetting && (
          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
        )}
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Next automatic reset:
          </div>
          <div className="text-xs font-mono bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border text-gray-700 dark:text-gray-300">
            {nextResetTime}
          </div>
        </div>

        <button
          onClick={handleReset}
          disabled={isLoading || isResetting}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
            isLoading || isResetting
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
          }`}
        >
          <RotateCcw 
            className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} 
          />
          <span>
            {isLoading ? 'Resetting...' : 'Manual Reset'}
          </span>
        </button>

        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          This will clear all completed tasks for the week
        </div>
      </div>
    </div>
  );
};

export default ResetButton;