// Simple database utility using JSONBin.io for free JSON storage
// This provides a basic database solution that persists data across devices

interface DatabaseResponse {
  record: any;
  metadata: {
    id: string;
    private: boolean;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

const API_BASE_URL = 'https://api.jsonbin.io/v3/b';
const BIN_ID = '68f7d53cae596e708f2245a7';
const API_KEY = '$2a$10$uBoTRHHfnKMolID1f4T9nOwItwnhdTto8j8OGT/wBzCnEFPXmwPl.';

// For development, we'll use localStorage as fallback
const useLocalStorage = false; // Set to true to disable cloud database and use localStorage only

export class Database {
  static async save(key: string, data: any): Promise<void> {
    if (useLocalStorage) {
      localStorage.setItem(key, JSON.stringify(data));
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
        },
        body: JSON.stringify({ [key]: data }),
      });

      if (!response.ok) {
        throw new Error('Failed to save to database');
      }
    } catch (error) {
      console.error('Database save error:', error);
      // Fallback to localStorage
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  static async load(key: string): Promise<any> {
    if (useLocalStorage) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load from database');
      }

      const result: DatabaseResponse = await response.json();
      return result.record[key] || null;
    } catch (error) {
      console.error('Database load error:', error);
      // Fallback to localStorage
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
  }

  static async createBin(name: string, initialData: any): Promise<string> {
    try {
      const response = await fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY,
        },
        body: JSON.stringify(initialData),
      });

      if (!response.ok) {
        throw new Error('Failed to create bin');
      }

      const result = await response.json();
      return result.metadata.id;
    } catch (error) {
      console.error('Failed to create bin:', error);
      throw error;
    }
  }
}

// Instructions for setting up JSONBin.io:
// 1. Go to https://jsonbin.io/
// 2. Sign up for a free account
// 3. Create a new bin
// 4. Get your API key from the dashboard
// 5. Replace the BIN_ID and API_KEY constants above
// 6. The data will then be stored in the cloud and accessible from any device
