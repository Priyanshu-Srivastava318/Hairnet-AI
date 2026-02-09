import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, ChevronLeft } from 'lucide-react';
import { analyzeHairHealth } from '../utils/mlAnalyzer';
import { saveUserData, saveAnalysisResults } from '../utils/storage';

// Step components
import BasicInfo from '../components/diagnosis/BasicInfo';
import LifestyleInfo from '../components/diagnosis/LifestyleInfo';
import HealthHistory from '../components/diagnosis/HealthHistory';
import DietInfo from '../components/diagnosis/DietInfo';
import ScalpImages from '../components/diagnosis/ScalpImages';
import Review from '../components/diagnosis/Review';

const TOTAL_STEPS = 6;

const Diagnosis = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [formData, setFormData] = useState({
    basicInfo: {  // Changed from 'basic' to 'basicInfo' for consistency
      fullName: '',
      age: '',
      gender: '',
      email: '',
      phone: '',  
      weight: '',
      height: '',
      dietPreference: 'non-vegetarian'  // Added default
    },
    lifestyle: {
      sleepHours: 7,
      stressLevel: 'medium',
      activityLevel: 'moderate',
      smoking: 'no',
      alcohol: 'occasional',
      waterIntake: 2
    },
    health: {
      thyroid: 'no',
      anemia: 'no',
      hormonal: 'no',
      diabetes: 'no',
      medications: [],
      otherConditions: ''
    },
    diet: {
      mealFrequency: 3,
      proteinSources: [],
      vegetables: 'moderate',
      fruits: 'moderate',
      processedFoods: 'low',
      ironRichFoods: true,
      fishOilOrNuts: 'yes',
      biotin: 'moderate',
      supplements: [],
      b12Intake: 'sometimes'  // Added for vegetarians
    },
    scalpImages: []
  });

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
    
    // Debug log
    console.log(`📝 Updated ${section}:`, data);
    console.log('📊 Full formData:', { ...formData, [section]: { ...formData[section], ...data } });
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Save user data
    saveUserData(formData);
    
    // Simulate processing time for realism
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Run analysis
    const results = analyzeHairHealth(formData);
    
    // Save results
    saveAnalysisResults(results);
    
    // Navigate to results
    navigate('/results');
  };

  const progressPercentage = Math.round((currentStep / TOTAL_STEPS) * 100);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo 
          data={formData.basicInfo} 
          onChange={(data) => updateFormData('basicInfo', data)} 
        />;
      case 2:
        return <LifestyleInfo 
          data={formData.lifestyle} 
          onChange={(data) => updateFormData('lifestyle', data)} 
        />;
      case 3:
        return <HealthHistory 
          data={formData.health} 
          onChange={(data) => updateFormData('health', data)} 
        />;
      case 4:
        return <DietInfo 
          data={formData.diet} 
          onChange={(data) => updateFormData('diet', data)}
          formData={formData}  // ⬅️ FIXED: Added formData prop
        />;
      case 5:
        return <ScalpImages 
          data={formData.scalpImages} 
          onChange={(images) => setFormData(prev => ({ ...prev, scalpImages: images }))}
        />;
      case 6:
        return <Review formData={formData} />;
      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.basicInfo.fullName && 
               formData.basicInfo.age && 
               formData.basicInfo.gender && 
               formData.basicInfo.email && 
               formData.basicInfo.phone &&
               formData.basicInfo.weight && 
               formData.basicInfo.height &&
               formData.basicInfo.dietPreference;  // Added diet preference validation
      case 2:
      case 3:
      case 4:
      case 5:
        return true; // These steps have default values
      case 6:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </button>
            <div className="text-primary-400 font-medium">
              Step {currentStep} of {TOTAL_STEPS}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="absolute -top-1 right-0 text-sm text-primary-400 font-medium">
              {progressPercentage}% Complete
            </div>
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card p-8 mb-8"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? 'bg-navy-700 text-gray-500 cursor-not-allowed'
                : 'btn-secondary'
            }`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          {currentStep < TOTAL_STEPS ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                !isStepValid()
                  ? 'bg-navy-700 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              Next Step
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn-primary px-8 py-4 text-lg flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="loading-spinner w-5 h-5"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  Generate Analysis
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Your data is encrypted and stored securely. We never share your information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;