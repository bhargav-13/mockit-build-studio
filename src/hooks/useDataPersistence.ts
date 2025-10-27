import { useState, useEffect } from 'react';
import { Database } from '@/lib/database';

export function useDataPersistence<T>(key: string, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await Database.load(key);
        if (savedData) {
          setData(savedData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [key]);

  // Save data whenever it changes
  const updateData = async (newData: T) => {
    setData(newData);
    try {
      await Database.save(key, newData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return { data, updateData, isLoading };
}
