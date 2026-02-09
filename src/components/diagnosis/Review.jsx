import { CheckCircle, AlertCircle, Leaf, Drumstick } from 'lucide-react';

const Review = ({ formData }) => {
  // Fixed: Changed from formData.basic to formData.basicInfo
  const bmi = formData.basicInfo?.weight && formData.basicInfo?.height
    ? (formData.basicInfo.weight / ((formData.basicInfo.height / 100) ** 2)).toFixed(1)
    : 'N/A';

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
        Review Your Information
      </h2>
      <p className="text-gray-400 text-sm mb-6">Please verify all details before generating your analysis</p>

      <div className="space-y-5">
        {/* Basic Info */}
        <div className="bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border border-emerald-700/30 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="text-emerald-400" size={18} />
            Basic Information
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-400">Name:</span>
              <span className="ml-2 text-white font-medium">{formData.basicInfo?.fullName || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Age:</span>
              <span className="ml-2 text-white font-medium">{formData.basicInfo?.age || 'N/A'} years</span>
            </div>
            <div>
              <span className="text-gray-400">Gender:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.basicInfo?.gender || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">BMI:</span>
              <span className="ml-2 text-emerald-400 font-bold">{bmi}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-400">Diet Preference:</span>
              <span className="ml-2 inline-flex items-center gap-1.5">
                {formData.basicInfo?.dietPreference === 'vegetarian' ? (
                  <>
                    <Leaf size={16} className="text-green-400" />
                    <span className="text-green-400 font-medium">Vegetarian</span>
                  </>
                ) : (
                  <>
                    <Drumstick size={16} className="text-blue-400" />
                    <span className="text-blue-400 font-medium">Non-Vegetarian</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="bg-gradient-to-r from-blue-900/20 to-slate-900/20 border border-blue-700/30 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="text-blue-400" size={18} />
            Lifestyle
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-400">Sleep:</span>
              <span className="ml-2 text-white font-medium">{formData.lifestyle?.sleepHours || 0}h/night</span>
              {(formData.lifestyle?.sleepHours || 0) < 7 && (
                <AlertCircle className="inline ml-2 text-amber-400" size={14} />
              )}
            </div>
            <div>
              <span className="text-gray-400">Stress Level:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.lifestyle?.stressLevel || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Activity:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.lifestyle?.activityLevel || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Water Intake:</span>
              <span className="ml-2 text-white font-medium">{formData.lifestyle?.waterIntake || 0}L/day</span>
            </div>
          </div>
        </div>

        {/* Health */}
        <div className="bg-gradient-to-r from-emerald-900/20 to-slate-900/20 border border-emerald-700/30 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="text-emerald-400" size={18} />
            Health History
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-400">Thyroid Issues:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.health?.thyroid || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Anemia:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.health?.anemia || 'N/A'}</span>
              {formData.health?.anemia === 'yes' && (
                <AlertCircle className="inline ml-2 text-red-400" size={14} />
              )}
            </div>
            <div>
              <span className="text-gray-400">Hormonal Issues:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.health?.hormonal || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Medications:</span>
              <span className="ml-2 text-white font-medium">{formData.health?.medications?.length || 0} listed</span>
            </div>
          </div>
        </div>

        {/* Diet */}
        <div className="bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border border-blue-700/30 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="text-blue-400" size={18} />
            Diet & Nutrition
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-400">Meals/Day:</span>
              <span className="ml-2 text-white font-medium">{formData.diet?.mealFrequency || 0}</span>
            </div>
            <div>
              <span className="text-gray-400">Protein Sources:</span>
              <span className="ml-2 text-white font-medium">{formData.diet?.proteinSources?.length || 0} types</span>
              {(formData.diet?.proteinSources?.length || 0) < 2 && (
                <AlertCircle className="inline ml-2 text-amber-400" size={14} />
              )}
            </div>
            <div>
              <span className="text-gray-400">Iron-Rich Foods:</span>
              <span className="ml-2 text-white font-medium">{formData.diet?.ironRichFoods ? 'Yes' : 'Rarely'}</span>
            </div>
            <div>
              <span className="text-gray-400">Omega-3 Sources:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.diet?.fishOilOrNuts || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Vegetables:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.diet?.vegetables || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-400">Processed Foods:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.diet?.processedFoods || 'N/A'}</span>
            </div>
            
            {/* B12 for Vegetarians */}
            {formData.basicInfo?.dietPreference === 'vegetarian' && (
              <div className="md:col-span-2">
                <span className="text-gray-400">Vitamin B12:</span>
                <span className="ml-2 text-white font-medium capitalize">{formData.diet?.b12Intake || 'N/A'}</span>
                {formData.diet?.b12Intake === 'no' && (
                  <AlertCircle className="inline ml-2 text-amber-400" size={14} />
                )}
              </div>
            )}
          </div>
          
          {/* Protein List */}
          {formData.diet?.proteinSources?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-emerald-700/30">
              <span className="text-gray-400 text-xs">Selected Proteins:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.diet.proteinSources.map((protein, idx) => (
                  <span key={idx} className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30">
                    {protein}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Images */}
        <div className="bg-gradient-to-r from-slate-900/20 to-blue-900/20 border border-blue-700/30 rounded-lg p-5">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="text-blue-400" size={18} />
            Scalp Images
          </h3>
          <p className="text-sm text-gray-300">
            {formData.scalpImages?.length > 0 
              ? `${formData.scalpImages.length} image(s) uploaded for visual analysis`
              : 'No images uploaded (analysis will be based on health and lifestyle data)'}
          </p>
        </div>

        {/* Warning Messages */}
        {((formData.lifestyle?.sleepHours || 0) < 7 || 
          formData.health?.anemia === 'yes' || 
          (formData.diet?.proteinSources?.length || 0) < 2 ||
          (formData.basicInfo?.dietPreference === 'vegetarian' && formData.diet?.b12Intake === 'no')) && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-400 flex-shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-amber-400 font-medium text-sm mb-1">Potential Risk Factors Detected</p>
                <p className="text-xs text-gray-300">
                  Our analysis has identified some factors that may be affecting your hair health. 
                  Don't worry - we'll provide detailed recommendations to address these issues.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ready Notice */}
        <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-emerald-500/30 rounded-lg p-5 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Ready for Analysis</h3>
          <p className="text-gray-300 text-sm">
            Our AI will process your data to identify root causes and generate personalized recommendations. 
            This takes about 2-3 seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;