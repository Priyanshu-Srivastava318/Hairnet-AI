import { useState, useEffect } from 'react';
import { User, Mail, Scale, Ruler, Leaf, Drumstick, Phone, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const BasicInfo = ({ data, onChange }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!phone) return 'Phone number is required';
    if (!phoneRegex.test(phone)) return 'Please enter a valid 10-digit mobile number';
    return '';
  };

  const validateName = (name) => {
    if (!name) return 'Full name is required';
    if (name.length < 3) return 'Name must be at least 3 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    return '';
  };

  const validateAge = (age) => {
    if (!age) return 'Age is required';
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return 'Age must be a number';
    if (ageNum < 18) return 'You must be at least 18 years old';
    if (ageNum > 100) return 'Please enter a valid age';
    return '';
  };

  const validateWeight = (weight) => {
    if (!weight) return 'Weight is required';
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum)) return 'Weight must be a number';
    if (weightNum < 30) return 'Weight must be at least 30 kg';
    if (weightNum > 200) return 'Weight must be less than 200 kg';
    return '';
  };

  const validateHeight = (height) => {
    if (!height) return 'Height is required';
    const heightNum = parseFloat(height);
    if (isNaN(heightNum)) return 'Height must be a number';
    if (heightNum < 100) return 'Height must be at least 100 cm';
    if (heightNum > 250) return 'Height must be less than 250 cm';
    return '';
  };

  const validateGender = (gender) => {
    if (!gender) return 'Please select your gender';
    return '';
  };

  const validateDietPreference = (pref) => {
    if (!pref) return 'Please select your diet preference';
    return '';
  };

  // Validate all fields
  const validateField = (field, value) => {
    switch (field) {
      case 'fullName':
        return validateName(value);
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'age':
        return validateAge(value);
      case 'weight':
        return validateWeight(value);
      case 'height':
        return validateHeight(value);
      case 'gender':
        return validateGender(value);
      case 'dietPreference':
        return validateDietPreference(value);
      default:
        return '';
    }
  };

  // Handle input change with validation
  const handleChange = (field, value) => {
    // Update data
    onChange({ [field]: value });

    // Mark field as touched
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Handle blur (when user leaves the field)
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, data[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Get input border color based on validation state
  const getInputClassName = (field) => {
    const baseClass = "input-field";
    if (!touched[field]) return baseClass;
    if (errors[field]) return `${baseClass} border-red-500 focus:border-red-500`;
    if (data[field]) return `${baseClass} border-green-500 focus:border-green-500`;
    return baseClass;
  };

  // Get validation icon
  const getValidationIcon = (field) => {
    if (!touched[field] || !data[field]) return null;
    if (errors[field]) {
      return <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={20} />;
    }
    return <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />;
  };

  return (
    <div>
      <h2 className="text-3xl font-display font-bold mb-2 text-white">Basic Information</h2>
      <p className="text-gray-400 mb-8">Let's start with some basic details about you</p>

      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              value={data.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              onBlur={() => handleBlur('fullName')}
              placeholder="Enter your full name"
              className={`${getInputClassName('fullName')} pl-11 pr-11`}
            />
            {getValidationIcon('fullName')}
          </div>
          {touched.fullName && errors.fullName && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Age and Gender */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Age <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={data.age || ''}
                onChange={(e) => handleChange('age', e.target.value)}
                onBlur={() => handleBlur('age')}
                placeholder="25"
                min="18"
                max="100"
                className={`${getInputClassName('age')} pr-11`}
              />
              {getValidationIcon('age')}
            </div>
            {touched.age && errors.age && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.age}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gender <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={data.gender || ''}
                onChange={(e) => handleChange('gender', e.target.value)}
                onBlur={() => handleBlur('gender')}
                className={getInputClassName('gender')}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {data.gender && !errors.gender && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 pointer-events-none" size={20} />
              )}
            </div>
            {touched.gender && errors.gender && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.gender}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="your.email@example.com"
              className={`${getInputClassName('email')} pl-11 pr-11`}
            />
            {getValidationIcon('email')}
          </div>
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.email}
            </p>
          )}
          {touched.email && !errors.email && data.email && (
            <p className="mt-1 text-sm text-green-400 flex items-center gap-1">
              <CheckCircle size={14} />
              Valid email format
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => {
                // Only allow numbers
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                  handleChange('phone', value);
                }
              }}
              onBlur={() => handleBlur('phone')}
              placeholder="9876543210"
              maxLength="10"
              className={`${getInputClassName('phone')} pl-11 pr-11`}
            />
            {getValidationIcon('phone')}
          </div>
          {touched.phone && errors.phone && (
            <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.phone}
            </p>
          )}
          {touched.phone && !errors.phone && data.phone && (
            <p className="mt-1 text-sm text-green-400 flex items-center gap-1">
              <CheckCircle size={14} />
              Valid Indian mobile number
            </p>
          )}
        </div>

        {/* Diet Preference - VEG/NON-VEG */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Diet Preference <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleChange('dietPreference', 'vegetarian')}
              className={`p-4 rounded-lg border-2 transition-all ${
                data.dietPreference === 'vegetarian'
                  ? 'border-green-500 bg-green-500/20 text-white'
                  : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
              }`}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <Leaf size={24} className={data.dietPreference === 'vegetarian' ? 'text-green-400' : 'text-gray-500'} />
                <span className="font-bold text-lg">Vegetarian</span>
              </div>
              <p className="text-xs text-gray-400">Plant-based diet recommendations</p>
            </button>

            <button
              type="button"
              onClick={() => handleChange('dietPreference', 'non-vegetarian')}
              className={`p-4 rounded-lg border-2 transition-all ${
                data.dietPreference === 'non-vegetarian'
                  ? 'border-primary-500 bg-primary-500/20 text-white'
                  : 'border-navy-600 bg-navy-800 text-gray-400 hover:border-navy-500'
              }`}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <Drumstick size={24} className={data.dietPreference === 'non-vegetarian' ? 'text-primary-400' : 'text-gray-500'} />
                <span className="font-bold text-lg">Non-Vegetarian</span>
              </div>
              <p className="text-xs text-gray-400">Includes meat, fish & eggs</p>
            </button>
          </div>
          
          {touched.dietPreference && errors.dietPreference && (
            <p className="mt-3 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.dietPreference}
            </p>
          )}
          
          {data.dietPreference && (
            <div className="mt-3 bg-primary-500/10 border border-primary-500/30 rounded-lg p-3">
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} />
                <strong className="text-primary-400">Selected:</strong> Your diet recommendations will be tailored for {data.dietPreference === 'vegetarian' ? 'vegetarian' : 'non-vegetarian'} options.
              </p>
            </div>
          )}
        </div>

        {/* Weight and Height for BMI */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Weight (kg) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Scale className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="number"
                value={data.weight || ''}
                onChange={(e) => handleChange('weight', e.target.value)}
                onBlur={() => handleBlur('weight')}
                placeholder="70"
                min="30"
                max="200"
                step="0.1"
                className={`${getInputClassName('weight')} pl-11 pr-11`}
              />
              {getValidationIcon('weight')}
            </div>
            {touched.weight && errors.weight && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.weight}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Height (cm) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="number"
                value={data.height || ''}
                onChange={(e) => handleChange('height', e.target.value)}
                onBlur={() => handleBlur('height')}
                placeholder="170"
                min="100"
                max="250"
                step="0.1"
                className={`${getInputClassName('height')} pl-11 pr-11`}
              />
              {getValidationIcon('height')}
            </div>
            {touched.height && errors.height && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.height}
              </p>
            )}
          </div>
        </div>

        {/* BMI Preview */}
        {data.weight && data.height && !errors.weight && !errors.height && (
          <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Your BMI</p>
              <CheckCircle className="text-green-400" size={18} />
            </div>
            <p className="text-3xl font-bold text-primary-400">
              {((data.weight / ((data.height / 100) ** 2))).toFixed(1)}
            </p>
            <p className="text-sm text-gray-300 mt-2">
              Category: {' '}
              <span className={`font-semibold ${
                ((data.weight / ((data.height / 100) ** 2))) < 18.5 ? 'text-amber-400' :
                ((data.weight / ((data.height / 100) ** 2))) >= 18.5 && ((data.weight / ((data.height / 100) ** 2))) < 25 ? 'text-green-400' :
                ((data.weight / ((data.height / 100) ** 2))) >= 25 && ((data.weight / ((data.height / 100) ** 2))) < 30 ? 'text-amber-400' :
                'text-red-400'
              }`}>
                {((data.weight / ((data.height / 100) ** 2))) < 18.5 && 'Underweight'}
                {((data.weight / ((data.height / 100) ** 2))) >= 18.5 && ((data.weight / ((data.height / 100) ** 2))) < 25 && 'Normal Weight'}
                {((data.weight / ((data.height / 100) ** 2))) >= 25 && ((data.weight / ((data.height / 100) ** 2))) < 30 && 'Overweight'}
                {((data.weight / ((data.height / 100) ** 2))) >= 30 && 'Obese'}
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {((data.weight / ((data.height / 100) ** 2))) < 18.5 && 'Consider consulting a nutritionist to reach a healthy weight'}
              {((data.weight / ((data.height / 100) ** 2))) >= 18.5 && ((data.weight / ((data.height / 100) ** 2))) < 25 && 'You are in the healthy weight range!'}
              {((data.weight / ((data.height / 100) ** 2))) >= 25 && ((data.weight / ((data.height / 100) ** 2))) < 30 && 'Consider lifestyle modifications for better health'}
              {((data.weight / ((data.height / 100) ** 2))) >= 30 && 'Consult a healthcare professional for personalized guidance'}
            </p>
          </div>
        )}

        {/* Validation Summary */}
        {Object.keys(touched).length > 0 && (
          <div className="bg-navy-800/50 border border-navy-600 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Form Status:</h4>
            <div className="space-y-1 text-sm">
              {Object.keys(errors).filter(key => touched[key] && errors[key]).length > 0 ? (
                <p className="text-red-400 flex items-center gap-2">
                  <XCircle size={16} />
                  Please fix {Object.keys(errors).filter(key => touched[key] && errors[key]).length} error(s) to continue
                </p>
              ) : (
                <p className="text-green-400 flex items-center gap-2">
                  <CheckCircle size={16} />
                  All fields are valid! You can proceed to the next step.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;