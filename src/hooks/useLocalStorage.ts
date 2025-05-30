// src/hooks/useLocalStorage.ts
import { useState, useEffect, useRef } from 'react';
import { UseLocalStorageReturn } from '@/types';

export function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturn<T> {
  // Use ref to store initial value to prevent dependency changes
  const initialValueRef = useRef(initialValue);
  
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // Get from local storage then parse stored json or return initialValue
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedValue = JSON.parse(item);
        setStoredValue(parsedValue);
      } else {
        setStoredValue(initialValueRef.current);
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValueRef.current);
    } finally {
      setIsInitialized(true);
    }
  }, [key]); // Only depend on key

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save to local storage
      setStoredValue(valueToStore);
      if (isInitialized) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Function to remove the item from localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValueRef.current);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return { storedValue, setValue, removeValue };
}