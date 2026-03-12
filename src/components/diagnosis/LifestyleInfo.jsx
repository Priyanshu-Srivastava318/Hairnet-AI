import { Bed, Droplets, Cigarette, Dumbbell, Clock, Brain, Smartphone, Coffee } from 'lucide-react';
import { useState, useEffect } from 'react';

const LifestyleInfo = ({ data, onChange }) => {
  const [localData, setLocalData] = useState(data);

  // Calculate stress score automatically from multiple factors
  const calculateStressLevel = (formData) => {
    let stressScore = 0;

    // Sleep hours (0-10 points)
    if (formData.sleepHours < 6) stressScore += 10;
    else if (formData.sleepHours < 7) stressScore += 7;
    else if (formData.sleepHours <= 8) stressScore += 3;
    
    // Work hours (0-10 points)
    if (formData.workHours > 10) stressScore += 10;
    else if (formData.workHours > 8) stressScore += 7;
    else if (formData.workHours > 6) stressScore += 3;

    // Screen time (0-10 points)
    if (formData.screenTime > 8) stressScore += 10;
    else if (formData.screenTime > 6) stressScore += 7;
    else if (formData.screenTime > 4) stressScore += 3;

    // Caffeine intake (0-5 points)
    if (formData.caffeineIntake > 4) stressScore += 5;
    else if (formData.caffeineIntake > 2) stressScore += 3;

    // Activity level (reverse scoring, 0-10 points)
    if (formData.activityLevel === 'sedentary') stressScore += 10;
    else if (formData.activityLevel === 'light') stressScore += 7;
    else if (formData.activityLevel === 'moderate') stressScore += 3;

    // Sleep interruptions (0-10 points)
    if (formData.sleepInterruptions > 3) stressScore += 10;
    else if (formData.sleepInterruptions > 1) stressScore += 5;

    // Relaxation time (0-10 points)
    if (formData.relaxationTime === 0) stressScore += 10;
    else if (formData.relaxationTime < 30) stressScore += 7;
    else if (formData.relaxationTime < 60) stressScore += 3;

    // Convert to stress level
    if (stressScore >= 40) return 'high';
    if (stressScore >= 20) return 'moderate';
    return 'low';
  };

  const handleChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    
    // Auto-calculate stress level
    const calculatedStress = calculateStressLevel(updated);
    updated.stressLevel = calculatedStress;
    
    setLocalData(updated);
    onChange(updated);
  };

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Lifestyle Information
      </h2>
      <p className="text-gray-400 text-sm mb-5">
        Answer these questions honestly - they help us calculate your stress level accurately
      </p>

      <div className="space-y-5">
        {/* Sleep Hours */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Bed size={18} className="text-emerald-400" />
            How many hours do you sleep per night?
          </label>
          <input
            type="number"
            min="0"
            max="12"
            step="0.5"
            value={localData.sleepHours || ''}
            onChange={(e) => handleChange('sleepHours', parseFloat(e.target.value) || 0)}
            placeholder="e.g., 7"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1">Recommended: 7-8 hours</p>
        </div>

        {/* Sleep Interruptions */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Brain size={18} className="text-emerald-400" />
            How many times do you wake up during the night?
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={localData.sleepInterruptions || ''}
            onChange={(e) => handleChange('sleepInterruptions', parseInt(e.target.value) || 0)}
            placeholder="e.g., 0, 1, 2"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Work Hours */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Clock size={18} className="text-emerald-400" />
            How many hours do you work/study per day?
          </label>
          <input
            type="number"
            min="0"
            max="18"
            value={localData.workHours || ''}
            onChange={(e) => handleChange('workHours', parseInt(e.target.value) || 0)}
            placeholder="e.g., 8"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Screen Time */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Smartphone size={18} className="text-emerald-400" />
            Average daily screen time (hours, excluding work)?
          </label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={localData.screenTime || ''}
            onChange={(e) => handleChange('screenTime', parseFloat(e.target.value) || 0)}
            placeholder="e.g., 4"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1">Social media, entertainment, etc.</p>
        </div>

        {/* Caffeine Intake */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Coffee size={18} className="text-emerald-400" />
            How many caffeinated drinks per day? (coffee, tea, energy drinks)
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={localData.caffeineIntake || ''}
            onChange={(e) => handleChange('caffeineIntake', parseInt(e.target.value) || 0)}
            placeholder="e.g., 1, 2, 3"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Relaxation Time */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Brain size={18} className="text-emerald-400" />
            Daily relaxation/leisure time (minutes)?
          </label>
          <input
            type="number"
            min="0"
            max="300"
            step="15"
            value={localData.relaxationTime || ''}
            onChange={(e) => handleChange('relaxationTime', parseInt(e.target.value) || 0)}
            placeholder="e.g., 60"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1">Hobbies, meditation, walks, etc.</p>
        </div>

        {/* Activity Level */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Dumbbell size={18} className="text-emerald-400" />
            Physical Activity Level
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'sedentary', label: 'Sedentary', desc: 'Mostly sitting' },
              { value: 'light', label: 'Light', desc: 'Occasional walks' },
              { value: 'moderate', label: 'Moderate', desc: '3-4x exercise/week' },
              { value: 'active', label: 'Active', desc: '5+ workouts/week' }
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange('activityLevel', option.value)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  localData.activityLevel === option.value
                    ? 'border-emerald-500 bg-emerald-500/20'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <p className="font-medium text-white text-sm">{option.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{option.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Water Intake */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Droplets size={18} className="text-emerald-400" />
            Daily Water Intake (Liters)
          </label>
          <input
            type="number"
            min="0"
            max="6"
            step="0.25"
            value={localData.waterIntake || ''}
            onChange={(e) => handleChange('waterIntake', parseFloat(e.target.value) || 0)}
            placeholder="e.g., 2, 2.5, 3"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1">Recommended: 2.5-3 liters</p>
        </div>

        {/* Smoking */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Cigarette size={18} className="text-emerald-400" />
            Do you smoke?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'no', label: 'No' },
              { value: 'yes', label: 'Yes' }
            ].map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleChange('smoking', option.value)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  localData.smoking === option.value
                    ? 'border-emerald-500 bg-emerald-500/20'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <p className="font-medium text-white">{option.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Calculated Stress Level Display */}
        <div className="bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border border-emerald-700/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Calculated Stress Level:</p>
              <p className={`text-lg font-bold capitalize ${
                localData.stressLevel === 'high' ? 'text-red-400' :
                localData.stressLevel === 'moderate' ? 'text-amber-400' :
                'text-green-400'
              }`}>
                {localData.stressLevel || 'Moderate'}
              </p>
            </div>
            <Brain className={`${
              localData.stressLevel === 'high' ? 'text-red-400' :
              localData.stressLevel === 'moderate' ? 'text-amber-400' :
              'text-green-400'
            }`} size={32} />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Based on your sleep, work hours, screen time, activity level, and relaxation habits
          </p>
        </div>
      </div>
    </div>
  );
};

export default LifestyleInfo;