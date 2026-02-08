import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, AlertTriangle, TrendingUp, Apple, Calendar, 
  BarChart3, CheckCircle, Activity, Sparkles, Download 
} from 'lucide-react';
import { getLatestAnalysis } from '../utils/storage';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const Results = () => {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const results = getLatestAnalysis();
    if (!results) {
      navigate('/diagnosis');
    } else {
      setAnalysis(results);
    }
  }, [navigate]);

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner w-16 h-16"></div>
      </div>
    );
  }

  const riskLevel = analysis.riskScore < 30 ? 'Low' : analysis.riskScore < 60 ? 'Moderate' : 'High';
  const riskColor = analysis.riskScore < 30 ? 'text-green-400' : analysis.riskScore < 60 ? 'text-amber-400' : 'text-red-400';

  // Data for charts
  const factorData = analysis.rootCauses.map(cause => ({
    name: cause.cause,
    confidence: cause.confidence,
    priority: cause.priority
  }));

  const COLORS = ['#0fa0a0', '#1abbbb', '#4dcaca', '#80d9d9'];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors mb-4"
          >
            <Home size={20} />
            Back to Home
          </button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                <span className="gradient-text">Hair Health Analysis</span>
              </h1>
              <p className="text-gray-400">
                Personalized insights powered by AI
              </p>
            </div>
            <button className="btn-secondary flex items-center gap-2">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">BMI</span>
              <Activity className="text-primary-400" size={20} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{analysis.bmi}</div>
            <p className="text-xs text-gray-500">
              {analysis.bmi < 18.5 && 'Underweight'}
              {analysis.bmi >= 18.5 && analysis.bmi < 25 && 'Normal'}
              {analysis.bmi >= 25 && analysis.bmi < 30 && 'Overweight'}
              {analysis.bmi >= 30 && 'Obese'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Risk Score</span>
              <AlertTriangle className={riskColor} size={20} />
            </div>
            <div className={`text-3xl font-bold mb-1 ${riskColor}`}>{analysis.riskScore}</div>
            <p className="text-xs text-gray-500">{riskLevel} Risk</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Root Causes Found</span>
              <BarChart3 className="text-accent-400" size={20} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{analysis.rootCauses.length}</div>
            <p className="text-xs text-gray-500">Identified factors</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Expected Results</span>
              <Calendar className="text-green-400" size={20} />
            </div>
            <div className="text-3xl font-bold text-white mb-1">12-16</div>
            <p className="text-xs text-gray-500">weeks</p>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Sparkles },
            { id: 'causes', label: 'Root Causes', icon: AlertTriangle },
            { id: 'nutrition', label: 'Nutrition Plan', icon: Apple },
            { id: 'timeline', label: 'Recovery Timeline', icon: Calendar },
            { id: 'recommendations', label: 'Recommendations', icon: CheckCircle }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-navy-700 text-gray-400 hover:bg-navy-600'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Insights */}
              <div className="card p-8 bg-gradient-to-br from-primary-900/20 to-accent-900/20 border-2 border-primary-500/30">
                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                  <Sparkles className="text-primary-400" />
                  Key Insights
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Primary Issue</h3>
                    <p className="text-lg font-semibold text-white">{analysis.insights.primaryIssue}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Key Finding</h3>
                    <p className="text-lg font-semibold text-white">{analysis.insights.keyFinding}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Confidence Level</h3>
                    <p className="text-lg font-semibold text-primary-400">{analysis.insights.confidence}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Success Probability</h3>
                    <p className="text-lg font-semibold text-green-400">{analysis.insights.successProbability}</p>
                  </div>
                </div>
              </div>

              {/* Nutritional Gaps Chart */}
              {analysis.nutritionalGaps.length > 0 && (
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-6 text-white">Nutritional Deficiencies</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {analysis.nutritionalGaps.map((gap, index) => (
                      <div key={index} className="bg-navy-800/50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-white">{gap.nutrient}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            gap.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                            gap.severity === 'high' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {gap.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          <strong>Current:</strong> {gap.current}
                        </p>
                        <p className="text-sm text-gray-400 mb-2">
                          <strong>Recommended:</strong> {gap.recommended}
                        </p>
                        <p className="text-sm text-primary-400">
                          <strong>Impact:</strong> {gap.impact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'causes' && (
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Identified Root Causes</h2>
                <p className="text-gray-400 mb-6">
                  Our AI has analyzed your health profile and identified {analysis.rootCauses.length} key factors 
                  contributing to your hair health issues. Each factor is ranked by confidence level.
                </p>

                {/* Chart */}
                <div className="h-80 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={factorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a3f5f" />
                      <XAxis dataKey="name" stroke="#9ca3af" angle={-45} textAnchor="end" height={120} />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1a2942', border: '1px solid #0fa0a0' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="confidence" fill="#0fa0a0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Detailed List */}
                <div className="space-y-4">
                  {analysis.rootCauses.map((cause, index) => (
                    <div key={index} className="bg-navy-800/50 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold text-white">{cause.cause}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">Confidence:</span>
                          <span className="text-lg font-bold text-primary-400">{cause.confidence}%</span>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3">{cause.description}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          cause.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                          cause.priority === 'high' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {cause.priority} priority
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="space-y-6">
              {/* Daily Targets */}
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Daily Nutritional Targets</h2>
                <div className="grid md:grid-cols-4 gap-4">
                  {Object.entries(analysis.dietPlan.dailyTargets).map(([key, value]) => (
                    <div key={key} className="bg-navy-800/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-400 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-xl font-bold text-primary-400">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meal Plan */}
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Recommended Meal Plan</h2>
                <div className="space-y-6">
                  {Object.entries(analysis.dietPlan.mealPlan).map(([meal, items]) => (
                    <div key={meal} className="bg-navy-800/50 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-white mb-4 capitalize">{meal}</h3>
                      <ul className="space-y-2">
                        {items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-300">
                            <CheckCircle className="text-primary-400 flex-shrink-0 mt-0.5" size={18} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Recovery Timeline</h2>
              <p className="text-gray-400 mb-8">
                Expected progress based on consistent adherence to recommendations. Individual results may vary.
              </p>
              
              <div className="space-y-6">
                {analysis.timeline.map((phase, index) => (
                  <div key={index} className="relative pl-8 pb-6 border-l-2 border-primary-500/30 last:border-0">
                    <div className="absolute left-0 top-0 w-4 h-4 -ml-[9px] rounded-full bg-primary-500"></div>
                    <div className="bg-navy-800/50 rounded-lg p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-primary-400 font-bold">Week {phase.week}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-white font-medium">{phase.phase}</span>
                      </div>
                      <p className="text-gray-300 mb-2">{phase.changes}</p>
                      <p className="text-sm text-green-400">✓ {phase.visible}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-primary-500/10 border border-primary-500/30 rounded-lg p-6">
                <h3 className="font-bold text-white mb-2">Expected Outcome</h3>
                <p className="text-gray-300">
                  With consistent implementation of our recommendations, you should see significant improvement 
                  in hair health within {analysis.insights.expectedTimeframe}. Remember, hair growth is a slow 
                  process - patience and consistency are key.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      rec.category === 'Nutrition' ? 'bg-primary-500/20' :
                      rec.category === 'Sleep' ? 'bg-blue-500/20' :
                      'bg-accent-500/20'
                    }`}>
                      {rec.category === 'Nutrition' && <Apple className="text-primary-400" size={24} />}
                      {rec.category === 'Sleep' && <Calendar className="text-blue-400" size={24} />}
                      {rec.category === 'Stress Management' && <Activity className="text-accent-400" size={24} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">{rec.title}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full bg-primary-500/20 text-primary-400`}>
                          {rec.category}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{rec.description}</p>
                      
                      <div className="bg-navy-800/50 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-white mb-3">Action Items:</h4>
                        <ul className="space-y-2">
                          {rec.actionItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300">
                              <CheckCircle className="text-primary-400 flex-shrink-0 mt-0.5" size={16} />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {rec.foodSources && (
                        <div className="bg-accent-500/10 border border-accent-500/30 rounded-lg p-4 mb-4">
                          <h4 className="font-medium text-accent-400 mb-2">Food Sources:</h4>
                          <div className="flex flex-wrap gap-2">
                            {rec.foodSources.map((food, i) => (
                              <span key={i} className="px-3 py-1 bg-navy-800 rounded-full text-sm text-gray-300">
                                {food}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <p className="text-sm text-green-400 flex items-center gap-2">
                        <TrendingUp size={16} />
                        {rec.expectedImpact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Next Steps CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 card p-8 text-center bg-gradient-to-r from-primary-900/30 to-accent-900/30"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Journey?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            You've received a comprehensive analysis. Now it's time to take action. Start implementing these 
            recommendations today and track your progress over the coming weeks.
          </p>
          <div className="flex justify-center gap-4">
            <button className="btn-primary">
              Download Full Report
            </button>
            <button onClick={() => navigate('/diagnosis')} className="btn-secondary">
              Take Another Analysis
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
