import { supabase } from './supabaseClient';

// Save user analysis to Supabase
export const saveAnalysisResults = async (userData, analysisResults) => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Insert analysis into database
    const { data, error } = await supabase
      .from('analyses')
      .insert({
        user_id: user.id,
        user_data: userData,
        analysis_results: analysisResults
      })
      .select()
      .single();

    if (error) throw error;

    // Also save to sessionStorage for immediate access
    sessionStorage.setItem('currentAnalysis', JSON.stringify(analysisResults));
    sessionStorage.setItem('latestAnalysisId', data.id);

    return data;
  } catch (error) {
    console.error('Error saving analysis:', error);
    
    // Fallback to localStorage if Supabase fails
    localStorage.setItem('latestAnalysis', JSON.stringify({
      userData,
      analysisResults,
      timestamp: new Date().toISOString()
    }));
    
    sessionStorage.setItem('currentAnalysis', JSON.stringify(analysisResults));
    
    throw error;
  }
};

// Get latest analysis (for current session or from Supabase)
export const getLatestAnalysis = async () => {
  try {
    // First check sessionStorage (for current session)
    const sessionAnalysis = sessionStorage.getItem('currentAnalysis');
    if (sessionAnalysis) {
      return JSON.parse(sessionAnalysis);
    }

    // Then check Supabase for most recent
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // If not logged in, check localStorage as fallback
      const localAnalysis = localStorage.getItem('latestAnalysis');
      if (localAnalysis) {
        const parsed = JSON.parse(localAnalysis);
        return parsed.analysisResults;
      }
      return null;
    }

    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No analyses found
        return null;
      }
      throw error;
    }

    // Cache in sessionStorage
    if (data) {
      sessionStorage.setItem('currentAnalysis', JSON.stringify(data.analysis_results));
      return data.analysis_results;
    }

    return null;
  } catch (error) {
    console.error('Error getting latest analysis:', error);
    
    // Fallback to localStorage
    const localAnalysis = localStorage.getItem('latestAnalysis');
    if (localAnalysis) {
      const parsed = JSON.parse(localAnalysis);
      return parsed.analysisResults;
    }
    
    return null;
  }
};

// Get all user analyses
export const getAllAnalyses = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error getting all analyses:', error);
    return [];
  }
};

// Delete an analysis
export const deleteAnalysis = async (analysisId) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('analyses')
      .delete()
      .eq('id', analysisId)
      .eq('user_id', user.id);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error deleting analysis:', error);
    throw error;
  }
};

// Save user data (deprecated - keeping for backward compatibility)
export const saveUserData = (userData) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

// Get user data (deprecated - keeping for backward compatibility)
export const getUserData = () => {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
};