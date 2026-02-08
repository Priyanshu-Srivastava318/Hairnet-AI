import { Moon, Heart, Activity, Cigarette, Wine, Droplets } from 'lucide-react';

const LifestyleInfo = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ [field]: value });
  };

  return (
    <div>
      <h2 className="text-3xl font-display font-bold mb-2 text-white">Lifestyle Information</h2>
      <p className="text-gray-400 mb-8">Your daily habits significantly impact hair health</p>

      <div className="space-y-8">
        {/* Sleep Hours */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Moon size={18} className="text-primary-400" />
            Average Sleep Hours per Night
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="4"
              max="12"
              value={data.sleepHours}
              onChange={(e) => handleChange('sleepHours', parseInt(e.target.value))}
              className="w-full h-2 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>4h</span>
              <span className="text-primary-400 font-bold text-lg">{data.sleepHours} hours</span>
              <span>12h</span>
            </div>
          </div>
          {data.sleepHours < 7 && (
            <p className="text-amber-400 text-sm mt-2">⚠️ Less than 7 hours may affect hair growth cycle</p>
          )}
        </div>

        {/* Stress Level */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Heart size={18} className="text-red-400" />
            Stress Level
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => handleChange('stressLevel', level)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.stressLevel === level
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium capitalize">{level}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Activity size={18} className="text-green-400" />
            Physical Activity Level
          </label>
          <select
            value={data.activityLevel}
            onChange={(e) => handleChange('activityLevel', e.target.value)}
            className="input-field"
          >
            <option value="sedentary">Sedentary (Little to no exercise)</option>
            <option value="light">Light (1-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
            <option value="very_active">Very Active (Intense daily exercise)</option>
          </select>
        </div>

        {/* Smoking */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Cigarette size={18} className="text-red-400" />
            Do you smoke?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {['no', 'yes'].map((option) => (
              <button
                key={option}
                onClick={() => handleChange('smoking', option)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.smoking === option
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium capitalize">{option}</div>
              </button>
            ))}
          </div>
          {data.smoking === 'yes' && (
            <p className="text-red-400 text-sm mt-2">⚠️ Smoking significantly impairs blood circulation to hair follicles</p>
          )}
        </div>

        {/* Alcohol */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Wine size={18} className="text-purple-400" />
            Alcohol Consumption
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'never', label: 'Never' },
              { value: 'occasional', label: 'Occasional' },
              { value: 'regular', label: 'Regular' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleChange('alcohol', option.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.alcohol === option.value
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Water Intake */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Droplets size={18} className="text-blue-400" />
            Daily Water Intake (liters)
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.5"
              value={data.waterIntake}
              onChange={(e) => handleChange('waterIntake', parseFloat(e.target.value))}
              className="w-full h-2 bg-navy-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>0.5L</span>
              <span className="text-blue-400 font-bold text-lg">{data.waterIntake}L</span>
              <span>5L</span>
            </div>
          </div>
          {data.waterIntake < 2 && (
            <p className="text-amber-400 text-sm mt-2">⚠️ Low hydration can lead to dry scalp and brittle hair</p>
          )}
        </div>
      </div>

      <div className="mt-8 bg-navy-800/50 rounded-lg p-4 border border-navy-600">
        <p className="text-sm text-gray-400">
          <strong className="text-primary-400">💡 Tip:</strong> Lifestyle factors like sleep, stress, and hydration 
          are often the hidden root causes of hair problems. Even small improvements can make a big difference.
        </p>
      </div>
    </div>
  );
};

export default LifestyleInfo;
