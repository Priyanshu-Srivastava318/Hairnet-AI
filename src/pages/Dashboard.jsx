import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, AlertTriangle, Eye, Trash2, Plus, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabaseClient';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalyses();
  }, [user]);

  const fetchAnalyses = async () => {
    try {
      const { data, error } = await supabase
        .from('analyses')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setAnalyses(data || []);
    } catch (err) {
      console.error('Error fetching analyses:', err);
      setError('Failed to load your analyses');
    } finally {
      setLoading(false);
    }
  };

  const deleteAnalysis = async (id) => {
    if (!confirm('Are you sure you want to delete this analysis?')) return;

    try {
      const { error } = await supabase
        .from('analyses')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;

      setAnalyses(analyses.filter(a => a.id !== id));
    } catch (err) {
      console.error('Error deleting analysis:', err);
      alert('Failed to delete analysis');
    }
  };

  const viewAnalysis = (analysis) => {
    // Store in sessionStorage and navigate to results
    sessionStorage.setItem('currentAnalysis', JSON.stringify(analysis.analysis_results));
    navigate('/results');
  };

  const getRiskColor = (riskScore) => {
    if (riskScore < 30) return 'text-green-400';
    if (riskScore < 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getRiskBg = (riskScore) => {
    if (riskScore < 30) return 'bg-green-500/20 border-green-500/30';
    if (riskScore < 60) return 'bg-amber-500/20 border-amber-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <Loader className="w-12 h-12 text-emerald-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your analyses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  My Dashboard
                </span>
              </h1>
              <p className="text-gray-400">
                View and manage your hair health analyses
              </p>
            </div>
            <button
              onClick={() => navigate('/diagnosis')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
            >
              <Plus size={20} />
              New Analysis
            </button>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-900/30 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Analyses Grid */}
        {analyses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-blue-900/20 to-emerald-900/20 border border-emerald-700/30 rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-emerald-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Analyses Yet</h3>
            <p className="text-gray-400 mb-6">
              Start your hair health journey by taking your first analysis
            </p>
            <button
              onClick={() => navigate('/diagnosis')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all"
            >
              <Plus size={20} />
              Start First Analysis
            </button>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyses.map((analysis, index) => {
              const results = analysis.analysis_results;
              
              return (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-6 border border-emerald-700/20 hover:border-emerald-500/50 transition-all group"
                >
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <Calendar size={16} />
                    {formatDate(analysis.created_at)}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Risk Score */}
                    <div className={`${getRiskBg(results.riskScore)} rounded-lg p-4 border`}>
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className={getRiskColor(results.riskScore)} size={16} />
                        <span className="text-xs text-gray-400">Risk Score</span>
                      </div>
                      <div className={`text-2xl font-bold ${getRiskColor(results.riskScore)}`}>
                        {results.riskScore}
                      </div>
                    </div>

                    {/* BMI */}
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="text-blue-400" size={16} />
                        <span className="text-xs text-gray-400">BMI</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-400">
                        {results.bmi}
                      </div>
                    </div>
                  </div>

                  {/* Root Causes Preview */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Top Issues:</h4>
                    <div className="space-y-2">
                      {results.rootCauses.slice(0, 2).map((cause, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          <span className="text-sm text-gray-300 truncate">{cause.cause}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => viewAnalysis(analysis)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all"
                    >
                      <Eye size={16} />
                      View Report
                    </button>
                    <button
                      onClick={() => deleteAnalysis(analysis.id)}
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all border border-red-700/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;