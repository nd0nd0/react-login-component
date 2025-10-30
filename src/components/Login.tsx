import React, { useState } from 'react';
import { useDevToolsDebug, usePerformanceMonitor } from '../utils/devtools';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  error?: string;
}

export const Login: React.FC<LoginProps> = ({ onSubmit, isLoading = false, error }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<LoginFormData>>({});

  // DevTools debugging hooks (only active in development)
  useDevToolsDebug('Login', { formData, fieldErrors, isLoading, error });
  usePerformanceMonitor('Login');

  const validateForm = (): boolean => {
    const errors: Partial<LoginFormData> = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof LoginFormData]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <form 
          className="bg-white/70 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl p-8 space-y-6" 
          onSubmit={handleSubmit} 
          noValidate
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h1 className="text-2xl font-light text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 text-sm">Sign in to continue</p>
          </div>
        
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50/80 border border-red-200/50 rounded-xl" role="alert">
              <div className="flex items-center space-x-3">
                <div className="shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3.5 border rounded-xl text-slate-900 placeholder-slate-400 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 ${
                fieldErrors.email 
                  ? 'border-red-300 bg-red-50/50' 
                  : 'border-slate-200 hover:border-slate-300'
              } ${isLoading ? 'bg-slate-100/50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
              autoComplete="email"
              placeholder="you@example.com"
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-xs text-red-600 flex items-center space-x-1" role="alert">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{fieldErrors.email}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3.5 border rounded-xl text-slate-900 placeholder-slate-400 bg-white/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 ${
                fieldErrors.password 
                  ? 'border-red-300 bg-red-50/50' 
                  : 'border-slate-200 hover:border-slate-300'
              } ${isLoading ? 'bg-slate-100/50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
              autoComplete="current-password"
              placeholder="••••••••"
              aria-describedby={fieldErrors.password ? 'password-error' : undefined}
            />
            {fieldErrors.password && (
              <p id="password-error" className="text-xs text-red-600 flex items-center space-x-1" role="alert">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{fieldErrors.password}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3.5 px-4 rounded-xl font-medium text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500/20 ${
              isLoading
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
            }`}
            disabled={isLoading}
            aria-describedby={isLoading ? 'loading-text' : undefined}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg 
                  className="animate-spin h-5 w-5 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span id="loading-text">Signing in...</span>
              </div>
            ) : (
              'Sign in'
            )}
          </button>

          {/* Demo Info */}
          <div className="pt-4 border-t border-slate-200/50">
            <div className="text-center">
              <p className="text-xs text-slate-500">
                Demo credentials
              </p>
              <p className="text-xs text-slate-600 font-mono mt-1">
                admin@example.com • password123
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;