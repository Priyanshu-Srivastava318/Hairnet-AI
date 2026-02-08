import { User, Mail, Scale, Ruler } from 'lucide-react';

const BasicInfo = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ [field]: value });
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
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              className="input-field pl-11"
              required
            />
          </div>
        </div>

        {/* Age and Gender */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Age <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              value={data.age}
              onChange={(e) => handleChange('age', e.target.value)}
              placeholder="25"
              min="18"
              max="100"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gender <span className="text-red-400">*</span>
            </label>
            <select
              value={data.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your.email@example.com"
              className="input-field pl-11"
              required
            />
          </div>
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
                value={data.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                placeholder="70"
                min="30"
                max="200"
                className="input-field pl-11"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Height (cm) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="number"
                value={data.height}
                onChange={(e) => handleChange('height', e.target.value)}
                placeholder="170"
                min="100"
                max="250"
                className="input-field pl-11"
                required
              />
            </div>
          </div>
        </div>

        {/* BMI Preview */}
        {data.weight && data.height && (
          <div className="bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Your BMI</p>
            <p className="text-2xl font-bold text-primary-400">
              {((data.weight / ((data.height / 100) ** 2))).toFixed(1)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {((data.weight / ((data.height / 100) ** 2))) < 18.5 && 'Underweight'}
              {((data.weight / ((data.height / 100) ** 2))) >= 18.5 && ((data.weight / ((data.height / 100) ** 2))) < 25 && 'Normal weight'}
              {((data.weight / ((data.height / 100) ** 2))) >= 25 && ((data.weight / ((data.height / 100) ** 2))) < 30 && 'Overweight'}
              {((data.weight / ((data.height / 100) ** 2))) >= 30 && 'Obese'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;
