// src/components/ResetButton.tsx
'use client';

import { useState } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { ResetButtonProps } from '@/types';

const ResetButton: React.FC<ResetButtonProps> = ({ onReset, isResetting = false }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }
    
    onReset();
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 shadow-lg">
        <div className="flex items-center space-x-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="font-semibold text-red-800 dark:text-red-200">
            Confirm Reset
          </span>
        </div>
        
        <p className="text-sm text-red-700 dark:text-red-300 mb-4">
          This will uncheck all completed tasks for the entire week. Are you sure?
        </p>
        
        <div className="flex space-x-2">
          <button
            onClick={handleReset}
            disabled={isResetting}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            {isResetting ? 'Resetting...' : 'Yes, Reset All'}
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleReset}
      disabled={isResetting}
      className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
    >
      <RotateCcw className={`w-5 h-5 ${isResetting ? 'animate-spin' : ''}`} />
      <span>
        {isResetting ? 'Resetting...' : 'Manual Reset'}
      </span>
    </button>
  );
};

export default ResetButton;