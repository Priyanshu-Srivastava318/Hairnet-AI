import { Utensils, Apple, Fish, Leaf } from 'lucide-react';

const DietInfo = ({ data, onChange, formData }) => {
  const handleChange = (field, value) => {
    onChange({ [field]: value });
  };

  const toggleProteinSource = (source) => {
    const current = data.proteinSources || [];
    if (current.includes(source)) {
      handleChange('proteinSources', current.filter(s => s !== source));
    } else {
      handleChange('proteinSources', [...current, source]);
    }
  };

  // Get diet preference from BasicInfo - FIXED
  const dietPreference = formData?.basicInfo?.dietPreference || 'non-vegetarian';
  
  // DEBUG - Remove after testing
  console.log('🔍 DietInfo Debug:');
  console.log('- Full formData:', formData);
  console.log('- basicInfo:', formData?.basicInfo);
  console.log('- dietPreference:', dietPreference);

  // Separate protein arrays
  const vegetarianProteins = ['Tofu', 'Paneer', 'Lentils', 'Chickpeas', 'Nuts', 'Beans', 'Quinoa', 'Yogurt'];
  const nonVegetarianProteins = ['Eggs', 'Chicken', 'Fish', 'Turkey', 'Lean Beef', 'Prawns', 'Yogurt', 'Cheese'];

  // Show CORRECT proteins based on selection
  const proteinOptions = dietPreference === 'vegetarian' ? vegetarianProteins : nonVegetarianProteins;

  return (
    <div>
      {/* Compact Header */}
      <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Diet Information
      </h2>
      <p className="text-gray-400 text-sm mb-5">Nutrition directly impacts hair health</p>

      <div className="space-y-4">
        {/* Diet Indicator - Compact */}
        <div className="bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border border-emerald-700/30 rounded-lg px-3 py-2">
          <p className="text-xs text-gray-300">
            <span className={`font-semibold ${dietPreference === 'vegetarian' ? 'text-green-400' : 'text-blue-400'}`}>
              {dietPreference === 'vegetarian' ? '🌱 Vegetarian' : '🍗 Non-Vegetarian'}
            </span> diet • Showing {dietPreference === 'vegetarian' ? 'plant-based' : 'meat & plant'} options
          </p>
        </div>

        {/* Meals per Day - More Compact */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Utensils size={16} className="text-blue-400" />
            Meals per Day
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleChange('mealFrequency', num)}
                className={`py-3 rounded-lg border transition-all text-lg font-bold ${
                  data.mealFrequency === num
                    ? 'border-emerald-500 bg-emerald-500/20 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-gray-400 hover:border-slate-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Protein Sources - Compact with Diet Badge */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Fish size={16} className="text-emerald-400" />
              Main Protein Sources
            </label>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              dietPreference === 'vegetarian' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            }`}>
              {dietPreference === 'vegetarian' ? 'Veg' : 'Non-Veg'}
            </span>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {proteinOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleProteinSource(option)}
                className={`py-2 px-2 rounded-lg border transition-all text-xs font-medium ${
                  data.proteinSources?.includes(option)
                    ? 'border-emerald-500 bg-emerald-500/20 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-gray-400 hover:border-slate-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          
          {data.proteinSources?.length < 2 && (
            <p className="text-amber-400 text-xs mt-1.5">⚠️ Select at least 2 for variety</p>
          )}
        </div>

        {/* Vegetables - More Compact */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Leaf size={16} className="text-green-400" />
            Vegetable Intake
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'low', label: 'Low', desc: '<2/day' },
              { value: 'moderate', label: 'Moderate', desc: '2-4/day' },
              { value: 'high', label: 'High', desc: '4+/day' }
            ].map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => handleChange('vegetables', level.value)}
                className={`py-2.5 px-3 rounded-lg border transition-all ${
                  data.vegetables === level.value
                    ? 'border-emerald-500 bg-emerald-500/20 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-gray-400 hover:border-slate-600'
                }`}
              >
                <div className="font-medium text-sm">{level.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fruits - More Compact */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Apple size={16} className="text-red-400" />
            Fruit Intake
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'low', label: 'Low', desc: '<1/day' },
              { value: 'moderate', label: 'Moderate', desc: '1-3/day' },
              { value: 'high', label: 'High', desc: '3+/day' }
            ].map((level) => (
              <button
                key={level.value}
                type="button"
                onClick={() => handleChange('fruits', level.value)}
                className={`py-2.5 px-3 rounded-lg border transition-all ${
                  data.fruits === level.value
                    ? 'border-emerald-500 bg-emerald-500/20 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-gray-400 hover:border-slate-600'
                }`}
              >
                <div className="font-medium text-sm">{level.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Layout for Compact Questions */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Processed Foods */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Processed Foods
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {['low', 'moderate', 'high'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleChange('processedFoods', level)}
                  className={`py-2 rounded-lg border transition-all text-xs font-medium ${
                    data.processedFoods === level
                      ? 'border-emerald-500 bg-emerald-500/20 text-white'
                      : 'border-slate-700 bg-slate-800/50 text-gray-400 hover:border-slate-600'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            {data.processedFoods === 'high' && (
              <p className="text-red-400 text-xs mt-1">⚠️ May cause deficiencies</p>
            )}
          </div>

          {/* Iron-Rich Foods */}
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Iron-Rich Foods
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { value: true, label: 'Yes' },
                { value: false, label: 'Rarely' }
              ].map((option) => (
                <button
                  key={option.value.toString()}
                  type="button"
                  onClick={() => handleChange('ironRichFoods', option.value)}
                  className={`py-2 rounded-lg border transition-all text-xs font-medium ${
                    data.ironRichFoods === option.value
                      ? 'border-emerald-500 bg-emerald-500/20 text-white'
                      : 'border-slate-700 bg-slate-800/50 text-gray-400 hover:border-slate-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {dietPreference === 'vegetarian' ? 'Spinach, beans, tofu' : 'Red meat, spinach, beans'}
            </p>
          </div>
        </div>

        {/* Omega-3 */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">
            Omega-3 Sources
            <span className="text-xs text-gray-500 ml-2">
              ({dietPreference === 'vegetarian' ? 'Flax, chia, walnuts' : 'Fish, walnuts, flax seeds'})
            </span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['yes', 'sometimes', 'rarely'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleChange('fishOilOrNuts', option)}
                className={`py-2 rounded-lg border transition-all text-xs font-medium ${
                  data.fishOilOrNuts === option
                    ? 'border-emerald-500 bg-emerald-500/20 text-white'
                    : 'border-slate-700 bg-slate-800/50 text-gray-400 hover:border-slate-600'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* B12 for Vegetarians Only */}
        {dietPreference === 'vegetarian' && (
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Vitamin B12 (Supplements/Fortified Foods)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['yes', 'sometimes', 'no'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleChange('b12Intake', option)}
                  className={`py-2 rounded-lg border transition-all text-xs font-medium ${
                    data.b12Intake === option
                      ? 'border-emerald-500 bg-emerald-500/20 text-white'
                      : 'border-slate-700 bg-slate-800/50 text-gray-400 hover:border-slate-600'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
            {data.b12Intake === 'no' && (
              <p className="text-amber-400 text-xs mt-1.5">
                ⚠️ B12 deficiency affects hair growth. Consider supplements.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Compact Bottom Tip */}
      <div className="mt-5 bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border border-emerald-700/30 rounded-lg px-3 py-2">
        <p className="text-xs text-gray-400">
          <strong className="text-emerald-400">💡 Key nutrients:</strong> Protein, Iron, Omega-3, Biotin, Zinc
          {dietPreference === 'vegetarian' && ', B12'}
        </p>
      </div>
    </div>
  );
};

export default DietInfo;