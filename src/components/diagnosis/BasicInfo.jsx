import { User, Mail, Calendar, Scale, Ruler, Users, Leaf, Drumstick, TrendingDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const BasicInfo = ({ data, onChange }) => {
  const [localData, setLocalData] = useState(data);

  const handleChange = (field, value) => {
    const updated = { ...localData, [field]: value };
    setLocalData(updated);
    onChange(updated);
  };

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Basic Information
      </h2>
      <p className="text-gray-400 text-sm mb-5">
        Let's start with some basic details about you
      </p>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <User size={18} className="text-emerald-400" />
            Full Name
          </label>
          <input
            type="text"
            value={localData.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Age and Gender */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Calendar size={18} className="text-emerald-400" />
              Age
            </label>
            <input
              type="number"
              min="15"
              max="80"
              value={localData.age || ''}
              onChange={(e) => handleChange('age', e.target.value)}
              placeholder="25"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Users size={18} className="text-emerald-400" />
              Gender
            </label>
            <select
              value={localData.gender || ''}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Mail size={18} className="text-emerald-400" />
            Email Address
          </label>
          <input
            type="email"
            value={localData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Weight and Height */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Scale size={18} className="text-emerald-400" />
              Weight (kg)
            </label>
            <input
              type="number"
              min="30"
              max="200"
              value={localData.weight || ''}
              onChange={(e) => handleChange('weight', e.target.value)}
              placeholder="70"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Ruler size={18} className="text-emerald-400" />
              Height (cm)
            </label>
            <input
              type="number"
              min="120"
              max="220"
              value={localData.height || ''}
              onChange={(e) => handleChange('height', e.target.value)}
              placeholder="175"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* NEW: Hair Fall Count */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <TrendingDown size={18} className="text-red-400" />
            Approximate daily hair fall count
          </label>
          <input
            type="number"
            min="0"
            max="500"
            value={localData.hairFallCount || ''}
            onChange={(e) => handleChange('hairFallCount', e.target.value)}
            placeholder="e.g., 50, 100, 150"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <div className="mt-2 text-xs text-gray-400 space-y-1">
            <p>• Normal: 50-100 strands/day</p>
            <p>• Concerning: 100-150 strands/day</p>
            <p>• Severe: 150+ strands/day</p>
          </div>
        </div>

        {/* Diet Preference */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-3 block">
            Diet Preference
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleChange('dietPreference', 'vegetarian')}
              className={`p-4 rounded-xl border-2 transition-all ${
                localData.dietPreference === 'vegetarian'
                  ? 'border-green-500 bg-green-500/20'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
              }`}
            >
              <Leaf className={`mx-auto mb-2 ${
                localData.dietPreference === 'vegetarian' ? 'text-green-400' : 'text-gray-400'
              }`} size={32} />
              <p className="font-medium text-white">Vegetarian</p>
              <p className="text-xs text-gray-400 mt-1">Plant-based diet</p>
            </button>

            <button
              type="button"
              onClick={() => handleChange('dietPreference', 'non-vegetarian')}
              className={`p-4 rounded-xl border-2 transition-all ${
                localData.dietPreference === 'non-vegetarian'
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
              }`}
            >
              <Drumstick className={`mx-auto mb-2 ${
                localData.dietPreference === 'non-vegetarian' ? 'text-blue-400' : 'text-gray-400'
              }`} size={32} />
              <p className="font-medium text-white">Non-Vegetarian</p>
              <p className="text-xs text-gray-400 mt-1">Includes meat & fish</p>
            </button>
          </div>
        </div>

        {/* BMI Indicator (Auto-calculated) */}
        {localData.weight && localData.height && (
          <div className="bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border border-emerald-700/30 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Your BMI:</p>
            <p className="text-2xl font-bold text-emerald-400">
              {((localData.weight / ((localData.height / 100) ** 2))).toFixed(1)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {(() => {
                const bmi = localData.weight / ((localData.height / 100) ** 2);
                if (bmi < 18.5) return 'Underweight';
                if (bmi < 25) return 'Normal weight';
                if (bmi < 30) return 'Overweight';
                return 'Obese';
              })()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;