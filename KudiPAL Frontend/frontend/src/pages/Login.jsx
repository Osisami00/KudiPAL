import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from './Toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setToast({ show: true, message: 'Please enter email and password', type: 'error' });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');
      
      if (!storedEmail || !storedPassword) {
        setToast({ show: true, message: 'No account found. Please sign up.', type: 'error' });
        return;
      }
      
      if (formData.email !== storedEmail || formData.password !== storedPassword) {
        setToast({ show: true, message: 'Invalid email or password', type: 'error' });
        return;
      }
      
      localStorage.setItem('isAuthenticated', 'true');
      
      setToast({ show: true, message: 'Login successful!', type: 'success' });
      
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      setToast({ show: true, message: 'Login failed. Try again.', type: 'error' });
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
          <p className="text-gray-600 mt-2">Welcome back</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-red-600" />
                <span className="ml-2 text-gray-600 text-sm">Remember me</span>
              </label>
              <Link to="#" className="text-red-600 text-sm font-medium">Forgot password?</Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Signup Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-red-600 font-semibold">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;