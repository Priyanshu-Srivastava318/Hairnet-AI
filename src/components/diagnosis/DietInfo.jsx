import { Utensils, Apple, Fish, Leaf } from 'lucide-react';

const DietInfo = ({ data, onChange }) => {
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

  const proteinOptions = [
    'Eggs', 'Chicken', 'Fish', 'Tofu', 'Lentils', 'Greek Yogurt', 'Nuts', 'Beans'
  ];

  return (
    <div>
      <h2 className="text-3xl font-display font-bold mb-2 text-white">Diet Information</h2>
      <p className="text-gray-400 mb-8">Your nutrition directly impacts hair health</p>

      <div className="space-y-8">
        {/* Meal Frequency */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Utensils size={18} className="text-primary-400" />
            Meals per Day
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => handleChange('mealFrequency', num)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.mealFrequency === num
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-bold text-xl">{num}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Protein Sources */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Fish size={18} className="text-accent-400" />
            Main Protein Sources (Select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {proteinOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleProteinSource(option)}
                className={`p-3 rounded-lg border-2 transition-all text-sm ${
                  data.proteinSources?.includes(option)
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {data.proteinSources?.length < 2 && (
            <p className="text-amber-400 text-sm mt-2">⚠️ Insufficient protein variety may affect hair structure</p>
          )}
        </div>

        {/* Vegetables */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Leaf size={18} className="text-green-400" />
            Vegetable Intake
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['low', 'moderate', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => handleChange('vegetables', level)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.vegetables === level
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium capitalize">{level}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {level === 'low' && '<2 servings/day'}
                  {level === 'moderate' && '2-4 servings/day'}
                  {level === 'high' && '4+ servings/day'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Fruits */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Apple size={18} className="text-red-400" />
            Fruit Intake
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['low', 'moderate', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => handleChange('fruits', level)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.fruits === level
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium capitalize">{level}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {level === 'low' && '<1 serving/day'}
                  {level === 'moderate' && '1-3 servings/day'}
                  {level === 'high' && '3+ servings/day'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Processed Foods */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Utensils size={18} className="text-amber-400" />
            Processed Food Consumption
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['low', 'moderate', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => handleChange('processedFoods', level)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.processedFoods === level
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium capitalize">{level}</div>
              </button>
            ))}
          </div>
          {data.processedFoods === 'high' && (
            <p className="text-red-400 text-sm mt-2">⚠️ High processed food intake may lead to nutrient deficiencies</p>
          )}
        </div>

        {/* Iron-Rich Foods */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Do you regularly consume iron-rich foods? (Spinach, red meat, beans)
          </label>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: true, label: 'Yes, regularly' },
              { value: false, label: 'Rarely/Never' }
            ].map((option) => (
              <button
                key={option.value.toString()}
                onClick={() => handleChange('ironRichFoods', option.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.ironRichFoods === option.value
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Omega-3 */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Do you consume fish oil or nuts regularly?
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['yes', 'sometimes', 'rarely'].map((option) => (
              <button
                key={option}
                onClick={() => handleChange('fishOilOrNuts', option)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.fishOilOrNuts === option
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium capitalize">{option}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-navy-800/50 rounded-lg p-4 border border-navy-600">
        <p className="text-sm text-gray-400">
          <strong className="text-primary-400">💡 Key Nutrients for Hair:</strong> Protein (structure), 
          Iron (growth cycle), Omega-3 (scalp health), Biotin (strength), Zinc (repair)
        </p>
      </div>
    </div>
  );
};

export default DietInfo;
