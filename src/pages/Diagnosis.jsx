import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeHairHealth } from '../utils/mlAnalyzer';
import { saveAnalysisResults } from '../utils/storage';

// Import all form components
import BasicInfo from '../components/diagnosis/BasicInfo';
import LifestyleInfo from '../components/diagnosis/LifestyleInfo';
import HealthHistory from '../components/diagnosis/HealthHistory';
import DietInfo from '../components/diagnosis/DietInfo';
import ScalpImages from '../components/diagnosis/ScalpImages';
import Review from '../components/diagnosis/Review';

const Diagnosis = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [formData, setFormData] = useState({
    basicInfo: {
      fullName: '',
      age: '',
      gender: '',
      email: '',
      weight: '',
      height: '',
      dietPreference: 'non-vegetarian'
    },
    lifestyle: {
      sleepHours: 7,
      stressLevel: 'moderate',
      smoking: 'no',
      activityLevel: 'moderate',
      waterIntake: 2
    },
    health: {
      thyroid: 'no',
      anemia: 'no',
      hormonal: 'no',
      medications: []
    },
    diet: {
      mealsPerDay: 3,
      proteinSources: [],
      vegetables: 'moderate',
      fruits: 'moderate',
      processedFoods: 'low',
      ironRichFoods: false,
      fishOilOrNuts: 'sometimes',
      b12Intake: 'sometimes'
    },
    scalpImages: []
  });

  const totalSteps = 6;

  const updateFormData = (section, data) => {
    console.log('Updating section:', section, 'with data:', data);
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);

    try {
      console.log('Generating analysis with form data:', formData);
      
      // Generate AI analysis
      const analysisResults = analyzeHairHealth(formData);
      console.log('Analysis results:', analysisResults);

      // Save to Supabase (analysis only, skip form_submissions for now)
      try {
        await saveAnalysisResults(formData, analysisResults);
        console.log('Analysis saved successfully');
      } catch (saveError) {
        console.error('Error saving to Supabase:', saveError);
        // Continue anyway - save to sessionStorage as fallback
      }

      // Store in sessionStorage for immediate access
      sessionStorage.setItem('userData', JSON.stringify(formData));
      sessionStorage.setItem('currentAnalysis', JSON.stringify(analysisResults));

      // Navigate to results
      setTimeout(() => {
        navigate('/results');
      }, 1000);

    } catch (error) {
      console.error('Error during analysis:', error);
      alert('Failed to generate analysis. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.basicInfo.fullName &&
               formData.basicInfo.age &&
               formData.basicInfo.gender &&
               formData.basicInfo.email &&
               formData.basicInfo.weight &&
               formData.basicInfo.height &&
               formData.basicInfo.dietPreference;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return formData.diet.proteinSources.length > 0;
      case 5:
        return true;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfo
            data={formData.basicInfo}
            onChange={(data) => updateFormData('basicInfo', data)}
          />
        );
      case 2:
        return (
          <LifestyleInfo
            data={formData.lifestyle}
            onChange={(data) => updateFormData('lifestyle', data)}
          />
        );
      case 3:
        return (
          <HealthHistory
            data={formData.health}
            onChange={(data) => updateFormData('health', data)}
          />
        );
      case 4:
        return (
          <DietInfo
            data={formData.diet}
            onChange={(data) => updateFormData('diet', data)}
            formData={formData}
          />
        );
      case 5:
        return (
          <ScalpImages
            data={formData.scalpImages}
            onChange={(images) => updateFormData('scalpImages', images)}
          />
        );
      case 6:
        return <Review formData={formData} />;
      default:
        return null;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Data...</h2>
          <p className="text-gray-400">Our AI is processing your information</p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Step {currentStep} of {totalSteps}</h2>
            <span className="text-sm text-gray-400">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-8 border border-emerald-700/20 mb-6">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 disabled:bg-slate-800/30 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all border border-emerald-700/30"
          >
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid() || isAnalyzing}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
            >
              Generate Analysis
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;