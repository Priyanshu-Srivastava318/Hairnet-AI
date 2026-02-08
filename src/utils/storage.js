// Storage utility - can be easily swapped with Supabase/Firebase
// Currently using localStorage with data persistence

const STORAGE_KEYS = {
  USER_DATA: 'haircare_user_data',
  ANALYSIS_RESULTS: 'haircare_analysis_results',
  USER_PROFILE: 'haircare_user_profile',
  PROGRESS_TRACKING: 'haircare_progress'
};

class StorageManager {
  // Save user data
  saveUserData(data) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      }));
      return { success: true };
    } catch (error) {
      console.error('Error saving user data:', error);
      return { success: false, error: error.message };
    }
  }

  // Get user data
  getUserData() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  }

  // Save analysis results
  saveAnalysisResults(results) {
    try {
      const existing = this.getAllAnalysisResults();
      const updated = [
        {
          ...results,
          id: Date.now(),
          date: new Date().toISOString()
        },
        ...existing
      ].slice(0, 10); // Keep last 10 analyses

      localStorage.setItem(STORAGE_KEYS.ANALYSIS_RESULTS, JSON.stringify(updated));
      return { success: true, id: Date.now() };
    } catch (error) {
      console.error('Error saving analysis results:', error);
      return { success: false, error: error.message };
    }
  }

  // Get all analysis results
  getAllAnalysisResults() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANALYSIS_RESULTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error retrieving analysis results:', error);
      return [];
    }
  }

  // Get latest analysis
  getLatestAnalysis() {
    const results = this.getAllAnalysisResults();
    return results.length > 0 ? results[0] : null;
  }

  // Save user profile
  saveUserProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      return { success: true };
    } catch (error) {
      console.error('Error saving user profile:', error);
      return { success: false, error: error.message };
    }
  }

  // Get user profile
  getUserProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      return null;
    }
  }

  // Track progress
  saveProgress(progressData) {
    try {
      const existing = this.getProgressHistory();
      const updated = [
        {
          ...progressData,
          timestamp: new Date().toISOString()
        },
        ...existing
      ];

      localStorage.setItem(STORAGE_KEYS.PROGRESS_TRACKING, JSON.stringify(updated));
      return { success: true };
    } catch (error) {
      console.error('Error saving progress:', error);
      return { success: false, error: error.message };
    }
  }

  // Get progress history
  getProgressHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS_TRACKING);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error retrieving progress history:', error);
      return [];
    }
  }

  // Clear all data
  clearAllData() {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return { success: true };
  }

  // Export data (for backup or migration to cloud)
  exportData() {
    return {
      userData: this.getUserData(),
      analysisResults: this.getAllAnalysisResults(),
      userProfile: this.getUserProfile(),
      progressHistory: this.getProgressHistory(),
      exportDate: new Date().toISOString()
    };
  }

  // Import data
  importData(data) {
    try {
      if (data.userData) this.saveUserData(data.userData);
      if (data.userProfile) this.saveUserProfile(data.userProfile);
      if (data.analysisResults) {
        localStorage.setItem(STORAGE_KEYS.ANALYSIS_RESULTS, JSON.stringify(data.analysisResults));
      }
      if (data.progressHistory) {
        localStorage.setItem(STORAGE_KEYS.PROGRESS_TRACKING, JSON.stringify(data.progressHistory));
      }
      return { success: true };
    } catch (error) {
      console.error('Error importing data:', error);
      return { success: false, error: error.message };
    }
  }
}

export const storage = new StorageManager();

// Helper functions for quick access
export const saveUserData = (data) => storage.saveUserData(data);
export const getUserData = () => storage.getUserData();
export const saveAnalysisResults = (results) => storage.saveAnalysisResults(results);
export const getLatestAnalysis = () => storage.getLatestAnalysis();
export const getAllAnalysisResults = () => storage.getAllAnalysisResults();

/*
 * MIGRATION TO SUPABASE/FIREBASE:
 * 
 * To migrate to cloud storage, create a new file 'cloudStorage.js' and implement:
 * 
 * 1. For Supabase:
 *    - Install: npm install @supabase/supabase-js
 *    - Initialize client with your project URL and anon key
 *    - Replace localStorage calls with supabase.from('table_name').insert/select
 * 
 * 2. For Firebase:
 *    - Install: npm install firebase
 *    - Initialize with your config
 *    - Replace localStorage with Firestore calls
 * 
 * 3. Keep same function signatures for easy drop-in replacement
 */
