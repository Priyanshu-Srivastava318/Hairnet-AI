import { CheckCircle, AlertCircle } from 'lucide-react';

const Review = ({ formData }) => {
  const bmi = (formData.basic.weight / ((formData.basic.height / 100) ** 2)).toFixed(1);

  return (
    <div>
      <h2 className="text-3xl font-display font-bold mb-2 text-white">Review Your Information</h2>
      <p className="text-gray-400 mb-8">Please verify all details before generating your analysis</p>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-navy-800/30 rounded-lg p-6 border border-navy-600">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="text-primary-400" size={20} />
            Basic Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Name:</span>
              <span className="ml-2 text-white font-medium">{formData.basic.fullName}</span>
            </div>
            <div>
              <span className="text-gray-400">Age:</span>
              <span className="ml-2 text-white font-medium">{formData.basic.age} years</span>
            </div>
            <div>
              <span className="text-gray-400">Gender:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.basic.gender}</span>
            </div>
            <div>
              <span className="text-gray-400">BMI:</span>
              <span className="ml-2 text-primary-400 font-bold">{bmi}</span>
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="bg-navy-800/30 rounded-lg p-6 border border-navy-600">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="text-primary-400" size={20} />
            Lifestyle
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Sleep:</span>
              <span className="ml-2 text-white font-medium">{formData.lifestyle.sleepHours}h/night</span>
              {formData.lifestyle.sleepHours < 7 && (
                <AlertCircle className="inline ml-2 text-amber-400" size={16} />
              )}
            </div>
            <div>
              <span className="text-gray-400">Stress Level:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.lifestyle.stressLevel}</span>
            </div>
            <div>
              <span className="text-gray-400">Activity:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.lifestyle.activityLevel}</span>
            </div>
            <div>
              <span className="text-gray-400">Water Intake:</span>
              <span className="ml-2 text-white font-medium">{formData.lifestyle.waterIntake}L/day</span>
            </div>
          </div>
        </div>

        {/* Health */}
        <div className="bg-navy-800/30 rounded-lg p-6 border border-navy-600">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="text-primary-400" size={20} />
            Health History
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Thyroid Issues:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.health.thyroid}</span>
            </div>
            <div>
              <span className="text-gray-400">Anemia:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.health.anemia}</span>
              {formData.health.anemia === 'yes' && (
                <AlertCircle className="inline ml-2 text-red-400" size={16} />
              )}
            </div>
            <div>
              <span className="text-gray-400">Hormonal Issues:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.health.hormonal}</span>
            </div>
            <div>
              <span className="text-gray-400">Medications:</span>
              <span className="ml-2 text-white font-medium">{formData.health.medications.length} listed</span>
            </div>
          </div>
        </div>

        {/* Diet */}
        <div className="bg-navy-800/30 rounded-lg p-6 border border-navy-600">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="text-primary-400" size={20} />
            Diet & Nutrition
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Meals/Day:</span>
              <span className="ml-2 text-white font-medium">{formData.diet.mealFrequency}</span>
            </div>
            <div>
              <span className="text-gray-400">Protein Sources:</span>
              <span className="ml-2 text-white font-medium">{formData.diet.proteinSources?.length || 0} types</span>
              {(formData.diet.proteinSources?.length || 0) < 2 && (
                <AlertCircle className="inline ml-2 text-amber-400" size={16} />
              )}
            </div>
            <div>
              <span className="text-gray-400">Iron-Rich Foods:</span>
              <span className="ml-2 text-white font-medium">{formData.diet.ironRichFoods ? 'Yes' : 'Rarely'}</span>
            </div>
            <div>
              <span className="text-gray-400">Processed Foods:</span>
              <span className="ml-2 text-white font-medium capitalize">{formData.diet.processedFoods}</span>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-navy-800/30 rounded-lg p-6 border border-navy-600">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="text-primary-400" size={20} />
            Scalp Images
          </h3>
          <p className="text-sm text-gray-300">
            {formData.scalpImages.length > 0 
              ? `${formData.scalpImages.length} image(s) uploaded for visual analysis`
              : 'No images uploaded (analysis will be based on health and lifestyle data)'}
          </p>
        </div>

        {/* Warning Messages */}
        {(formData.lifestyle.sleepHours < 7 || 
          formData.health.anemia === 'yes' || 
          (formData.diet.proteinSources?.length || 0) < 2) && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-amber-400 font-medium mb-2">Potential Risk Factors Detected</p>
                <p className="text-sm text-gray-300">
                  Our analysis has identified some factors that may be affecting your hair health. 
                  Don't worry - we'll provide detailed recommendations to address these issues.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ready Notice */}
        <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Ready for Analysis</h3>
          <p className="text-gray-300">
            Our AI will process your data to identify root causes and generate personalized recommendations. 
            This takes about 2-3 seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Review;
