import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from './Toast';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    middleName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    else if (formData.firstName.length < 2) newErrors.firstName = 'Must be at least 2 characters';

    if (!formData.surname.trim()) newErrors.surname = 'Surname is required';
    else if (formData.surname.length < 2) newErrors.surname = 'Must be at least 2 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) newErrors.password = '8+ chars with uppercase, lowercase, number';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setToast({ show: true, message: 'Please fix errors above', type: 'error' });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('userData', JSON.stringify(formData));
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userPassword', formData.password);

      setToast({ 
        show: true, 
        message: 'Account created successfully!', 
        type: 'success' 
      });
      
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setToast({ show: true, message: 'Signup failed. Try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      {/* Toast Notification */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-red-600 to-red-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">KudiPAL</h1>
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({...formData, firstName: e.target.value});
                  if (errors.firstName) setErrors({...errors, firstName: ''});
                }}
                placeholder="First Name"
                className={`w-full px-4 py-3 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            {/* Surname */}
            <div>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={(e) => {
                  setFormData({...formData, surname: e.target.value});
                  if (errors.surname) setErrors({...errors, surname: ''});
                }}
                placeholder="Surname"
                className={`w-full px-4 py-3 border rounded-lg ${errors.surname ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
            </div>

            {/* Middle Name */}
            <div>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                placeholder="Middle Name (Optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  if (errors.email) setErrors({...errors, email: ''});
                }}
                placeholder="Email Address"
                className={`w-full px-4 py-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({...formData, password: e.target.value});
                  if (errors.password) setErrors({...errors, password: ''});
                }}
                placeholder="Password"
                className={`w-full px-4 py-3 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({...formData, confirmPassword: e.target.value});
                  if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
                }}
                placeholder="Confirm Password"
                className={`w-full px-4 py-3 border rounded-lg ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-red-600 font-semibold">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;