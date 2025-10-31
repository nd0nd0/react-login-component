import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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

// Zod schema for form validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export const Login: React.FC<LoginProps> = ({ onSubmit, isLoading = false, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  // DevTools debugging hooks (only active in development)
  const formValues = watch();
  useDevToolsDebug('Login', { formValues, errors, isLoading, error });
  usePerformanceMonitor('Login');
  
  const onValidSubmit = (data: LoginFormData) => {
    if (isLoading) return;
    onSubmit(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-900">
      <div className="w-full max-w-sm">
        <form 
          className="p-8 space-y-6 border shadow-2xl bg-slate-800 border-slate-700 rounded-2xl" 
          onSubmit={handleSubmit(onValidSubmit)} 
          noValidate
        >
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-blue-600 shadow-lg rounded-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h1 className="text-2xl font-light tracking-tight text-white">Welcome back</h1>
            <p className="text-sm text-slate-400">Sign in to continue</p>
          </div>
        
          {/* Error Message */}
          {error && (
            <div className="p-4 border border-red-800 bg-red-900/50 rounded-xl" role="alert">
              <div className="flex items-center space-x-3">
                <div className="shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-red-300">{error}</p>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-3.5 border rounded-xl text-white placeholder-slate-500 bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 ${
                errors.email 
                  ? 'border-red-500 bg-red-900/20' 
                  : 'border-slate-600 hover:border-slate-500'
              } ${isLoading ? 'bg-slate-600 cursor-not-allowed' : ''}`}
              disabled={isLoading}
              autoComplete="email"
              placeholder="you@example.com"
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <p id="email-error" className="flex items-center space-x-1 text-xs text-red-400" role="alert">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.email.message}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-4 py-3.5 border rounded-xl text-white placeholder-slate-500 bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 ${
                errors.password 
                  ? 'border-red-500 bg-red-900/20' 
                  : 'border-slate-600 hover:border-slate-500'
              } ${isLoading ? 'bg-slate-600 cursor-not-allowed' : ''}`}
              disabled={isLoading}
              autoComplete="current-password"
              placeholder="••••••••"
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password')}
            />
            {errors.password && (
              <p id="password-error" className="flex items-center space-x-1 text-xs text-red-400" role="alert">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errors.password.message}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3.5 px-4 rounded-xl font-medium text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${
              isLoading
                ? 'bg-slate-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
            }`}
            disabled={isLoading}
            aria-describedby={isLoading ? 'loading-text' : undefined}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg 
                  className="w-5 h-5 text-white animate-spin" 
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
          <div className="pt-4 border-t border-slate-700">
            <div className="text-center">
              <p className="text-xs text-slate-400">
                Demo credentials
              </p>
              <p className="mt-1 font-mono text-xs text-slate-300">
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