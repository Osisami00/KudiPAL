import React, { useState, useEffect } from 'react';
import TypingEffect from './TypingEffect';

const AIActivationWizard = ({ onComplete, onClose }) => {
  const [step, setStep] = useState(0);
  const [showTyping, setShowTyping] = useState(true);
  const [formData, setFormData] = useState({
    preferredName: '',
    skills: [],
    customSkill: '',
    occupation: '',
    incomeRange: '',
    city: '',
    country: '',
    language: 'en'
  });

  // Skill suggestions
  const skillSuggestions = [
    'Carpentry', 'Plumbing', 'Electrical', 'Programming', 'Design',
    'Writing', 'Teaching', 'Healthcare', 'Cooking', 'Driving',
    'Marketing', 'Sales', 'Accounting', 'Engineering', 'Farming'
  ];

  // Occupation options
  const occupationOptions = [
    { value: 'monthly_salary', label: 'Monthly Salary Earner' },
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'business_owner', label: 'Business Owner' },
    { value: 'student', label: 'Student' },
    { value: 'retired', label: 'Retired' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'unemployed', label: 'Currently Unemployed' }
  ];

  // Income range options
  const incomeOptions = [
    { value: 'under_50k', label: 'Under ₦50,000' },
    { value: '50k_100k', label: '₦50,000 - ₦100,000' },
    { value: '100k_250k', label: '₦100,000 - ₦250,000' },
    { value: '250k_500k', label: '₦250,000 - ₦500,000' },
    { value: '500k_1m', label: '₦500,000 - ₦1,000,000' },
    { value: 'over_1m', label: 'Over ₦1,000,000' }
  ];

  // Language options
  const languageOptions = [
    { value: 'en', label: 'English', greeting: 'Hello' },
    { value: 'yo', label: 'Yoruba', greeting: 'Ẹ n lẹ' },
    { value: 'ig', label: 'Igbo', greeting: 'Ndewo' },
    { value: 'ha', label: 'Hausa', greeting: 'Sannu' },
    { value: 'pcm', label: 'Pidgin', greeting: 'Hello' },
    { value: 'ibb', label: 'Ibibio', greeting: 'Mɔkɔm' }
  ];

  // Country suggestions
  const countrySuggestions = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'UK', 'USA', 'Canada'];

  const handleTypingComplete = () => {
    setTimeout(() => setShowTyping(false), 500);
  };

  const handleNext = () => {
    if (step < 6) { // Changed from 5 to 6 because we added an extra step
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Save user preferences to localStorage
    localStorage.setItem('aiUserProfile', JSON.stringify(formData));
    localStorage.setItem('aiOnboarded', 'true');
    onComplete(formData);
  };

  const getStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to KudiPAL AI</h3>
              <p className="text-gray-600">Your personalized financial assistant</p>
            </div>

            {showTyping ? (
              <div className="bg-gray-50 p-6 rounded-xl min-h-[100px] flex items-center justify-center">
                <TypingEffect 
                  text="Hello! I'm KudiPAL AI. I'd like to get to know you better so I can provide personalized financial assistance. Let's start with a few questions..."
                  onComplete={handleTypingComplete}
                />
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <p className="text-green-800 mb-4">
                  To give you the best experience, I'd like to learn a bit about you. This will only take a minute!
                </p>
                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:opacity-90"
                >
                  Let's Get Started
                </button>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">What should I call you?</h3>
                <p className="text-gray-600">Enter your preferred name</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                1 of 6
              </span>
            </div>

            <input
              type="text"
              value={formData.preferredName}
              onChange={(e) => handleInputChange('preferredName', e.target.value)}
              placeholder="Enter your preferred name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.preferredName.trim()}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">What are your skills?</h3>
                <p className="text-gray-600">Select skills that apply to you</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                2 of 6
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {skillSuggestions.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`p-3 rounded-lg border text-sm font-medium ${
                    formData.skills.includes(skill)
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>

            <div>
              <input
                type="text"
                value={formData.customSkill}
                onChange={(e) => handleInputChange('customSkill', e.target.value)}
                placeholder="Add other skills (comma separated)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add custom skills</p>
            </div>

            {formData.skills.length > 0 && (
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-700 font-medium">Selected: {formData.skills.join(', ')}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:opacity-90"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">What's your occupation?</h3>
                <p className="text-gray-600">Select your current occupation status</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                3 of 6
              </span>
            </div>

            <div className="space-y-2">
              {occupationOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer ${
                    formData.occupation === option.value
                      ? 'bg-green-50 border-green-500'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="occupation"
                    value={option.value}
                    checked={formData.occupation === option.value}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="h-4 w-4 text-green-600"
                  />
                  <span className="ml-3 font-medium">{option.label}</span>
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.occupation}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">What's your income range?</h3>
                <p className="text-gray-600">Select your monthly income range</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                4 of 6
              </span>
            </div>

            <div className="space-y-2">
              {incomeOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer ${
                    formData.incomeRange === option.value
                      ? 'bg-green-50 border-green-500'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="incomeRange"
                    value={option.value}
                    checked={formData.incomeRange === option.value}
                    onChange={(e) => handleInputChange('incomeRange', e.target.value)}
                    className="h-4 w-4 text-green-600"
                  />
                  <span className="ml-3 font-medium">{option.label}</span>
                </label>
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.incomeRange}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Where do you live?</h3>
                <p className="text-gray-600">Enter your city and country</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                5 of 6
              </span>
            </div>

            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="City"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />

            <div>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="Country"
                list="country-suggestions"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <datalist id="country-suggestions">
                {countrySuggestions.map(country => (
                  <option key={country} value={country} />
                ))}
              </datalist>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!formData.city.trim() || !formData.country.trim()}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Choose your language</h3>
                <p className="text-gray-600">Select your preferred language for AI interaction</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                6 of 6
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {languageOptions.map((language) => (
                <button
                  key={language.value}
                  onClick={() => handleInputChange('language', language.value)}
                  className={`p-4 rounded-xl border text-center ${
                    formData.language === language.value
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-bold">{language.label}</div>
                  <div className="text-sm mt-1">{language.greeting}</div>
                </button>
              ))}
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">Review your information:</h4>
              <div className="space-y-2 text-sm text-green-700">
                <p><span className="font-medium">Name:</span> {formData.preferredName}</p>
                <p><span className="font-medium">Skills:</span> {formData.skills.join(', ') || 'None selected'}</p>
                <p><span className="font-medium">Occupation:</span> {occupationOptions.find(o => o.value === formData.occupation)?.label || 'Not selected'}</p>
                <p><span className="font-medium">Income Range:</span> {incomeOptions.find(o => o.value === formData.incomeRange)?.label || 'Not selected'}</p>
                <p><span className="font-medium">Location:</span> {formData.city}, {formData.country}</p>
                <p><span className="font-medium">Language:</span> {languageOptions.find(l => l.value === formData.language)?.label}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:opacity-90"
              >
                Submit & Activate AI
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {step > 0 && step < 7 && (
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Progress bar */}
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300"
                    style={{ width: `${((step) / 6) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                Step {step} of 6
              </div>
            </div>
          )}

          {getStepContent()}
        </div>
      </div>
    </div>
  );
};

export default AIActivationWizard;