import { Heart, AlertCircle, Pill } from 'lucide-react';
import { useState } from 'react';

const HealthHistory = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ [field]: value });
  };

  const [medicationInput, setMedicationInput] = useState('');

  const addMedication = () => {
    if (medicationInput.trim()) {
      handleChange('medications', [...data.medications, medicationInput.trim()]);
      setMedicationInput('');
    }
  };

  const removeMedication = (index) => {
    handleChange('medications', data.medications.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2 className="text-3xl font-display font-bold mb-2 text-white">Health History</h2>
      <p className="text-gray-400 mb-8">Medical conditions that may affect hair health</p>

      <div className="space-y-8">
        {/* Thyroid */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Heart size={18} className="text-primary-400" />
            Do you have thyroid issues?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {['no', 'yes'].map((option) => (
              <button
                key={option}
                onClick={() => handleChange('thyroid', option)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.thyroid === option
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium capitalize">{option}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Anemia */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <AlertCircle size={18} className="text-red-400" />
            Have you been diagnosed with anemia?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {['no', 'yes'].map((option) => (
              <button
                key={option}
                onClick={() => handleChange('anemia', option)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.anemia === option
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium capitalize">{option}</div>
              </button>
            ))}
          </div>
          {data.anemia === 'yes' && (
            <p className="text-amber-400 text-sm mt-2">Iron deficiency is a leading cause of hair loss</p>
          )}
        </div>

        {/* Hormonal Issues */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Heart size={18} className="text-purple-400" />
            Do you have hormonal imbalances (PCOS, hormonal disorders)?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {['no', 'yes'].map((option) => (
              <button
                key={option}
                onClick={() => handleChange('hormonal', option)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.hormonal === option
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium capitalize">{option}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Diabetes */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <AlertCircle size={18} className="text-amber-400" />
            Do you have diabetes?
          </label>
          <div className="grid grid-cols-2 gap-4">
            {['no', 'yes'].map((option) => (
              <button
                key={option}
                onClick={() => handleChange('diabetes', option)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  data.diabetes === option
                    ? 'border-primary-500 bg-primary-500/20 text-white'
                    : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
                }`}
              >
                <div className="font-medium capitalize">{option}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Medications */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Pill size={18} className="text-blue-400" />
            Current Medications
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={medicationInput}
              onChange={(e) => setMedicationInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addMedication()}
              placeholder="Enter medication name"
              className="input-field flex-1"
            />
            <button
              onClick={addMedication}
              className="btn-secondary whitespace-nowrap"
            >
              Add
            </button>
          </div>
          
          {data.medications.length > 0 && (
            <div className="space-y-2">
              {data.medications.map((med, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-navy-800 rounded-lg p-3"
                >
                  <span className="text-gray-300">{med}</span>
                  <button
                    onClick={() => removeMedication(index)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Other Conditions */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Other Medical Conditions (Optional)
          </label>
          <textarea
            value={data.otherConditions}
            onChange={(e) => handleChange('otherConditions', e.target.value)}
            placeholder="Any other conditions we should know about..."
            rows="4"
            className="input-field resize-none"
          />
        </div>
      </div>

      <div className="mt-8 bg-navy-800/50 rounded-lg p-4 border border-navy-600">
        <p className="text-sm text-gray-400">
          <strong className="text-primary-400">🔒 Privacy:</strong> Your health information is confidential 
          and used only to provide accurate recommendations. We never share your data with third parties.
        </p>
      </div>
    </div>
  );
};

export default HealthHistory;
