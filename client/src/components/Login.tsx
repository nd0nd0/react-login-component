import React from "react";
import {useForm  } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useDevToolsDebug, usePerformanceMonitor } from "../utils/devtools";
import { FiUser, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginProps {
  onSubmit: (data: LoginFormData) => void;
  onNavigateToRegister?: () => void;
  isLoading?: boolean;
  error?: string;
}

// Zod schema for form validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const Login: React.FC<LoginProps> = ({
  onSubmit,
  onNavigateToRegister,
  isLoading = false,
  error,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  // DevTools debugging hooks (only active in development)
  const formValues = watch();
  useDevToolsDebug("Login", { formValues, errors, isLoading, error });
  usePerformanceMonitor("Login");

  const onValidSubmit = (data: LoginFormData) => {
    if (isLoading) return;
    onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white"
    >
      {/* Top hero to match Splash */}
      <motion.div
        className="relative flex flex-col h-[35vh] bg-linear-to-b from-orange-500 to-orange-600 rounded-b-[60px] shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative sparkles (lightweight set) */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute w-2 h-2 bg-white rounded-full top-10 left-6 opacity-80"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 bg-white rounded-full top-16 left-1/4 opacity-60"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-white rounded-full top-28 right-10 opacity-80"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          />
        </div>

        {/* Center icon avatar to echo Splash silhouette */}
        <motion.div
          className="flex items-center justify-center flex-1"
          initial={{ scale: 0.8, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: "spring",
            stiffness: 120,
          }}
        >
          <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-xl">
            <FiUser className="w-10 h-10 text-orange-600" />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom content (form) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <form
          className="max-w-md px-6 py-8 mx-auto space-y-4 md:py-6"
          onSubmit={handleSubmit(onValidSubmit)}
          noValidate
        >
          <div className="text-left">
            <h1 className="mb-1 text-2xl font-bold text-gray-900">
              Welcome back
            </h1>
            <p className="text-sm text-gray-600">Sign in to continue</p>
          </div>
          {/* Demo Info */}
          <motion.div
            className="py-2 border-y border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="text-left">
              <p className="text-xs text-slate-500">Demo credentials</p>
              <p className="mt-1 font-mono text-xs text-slate-700">
                admin@example.com • password123
              </p>
            </div>
          </motion.div>

          {error && (
            <motion.div
              className="p-4 border border-red-200 rounded-xl bg-red-50"
              role="alert"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                <div className="shrink-0">
                  <FiAlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Email Field */}
          <motion.div
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-left text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-4 py-2 border rounded-xl text-gray-900 placeholder-slate-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 ${
                errors.email
                  ? "border-red-500 bg-red-900/20"
                  : "border-slate-300 hover:border-slate-400"
              } ${isLoading ? "bg-slate-100 cursor-not-allowed" : ""}`}
              disabled={isLoading}
              autoComplete="email"
              placeholder="you@example.com"
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p
                id="email-error"
                className="flex items-center space-x-1 text-xs text-red-600"
                role="alert"
              >
                <FiAlertCircle className="w-3 h-3" />
                <span>{errors.email.message}</span>
              </p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <label
              htmlFor="password"
              className="block text-sm font-medium text-left text-gray-800"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-2 pr-12 border rounded-xl text-gray-900 placeholder-slate-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 ${
                  errors.password
                    ? "border-red-500 bg-red-900/20"
                    : "border-slate-300 hover:border-slate-400"
                } ${isLoading ? "bg-slate-100 cursor-not-allowed" : ""}`}
                disabled={isLoading}
                autoComplete="current-password"
                placeholder="••••••••"
                aria-describedby={errors.password ? "password-error" : undefined}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 transition-colors -translate-y-1/2 mini-btn right-3 top-1/2 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                disabled={isLoading}
                 aria-label={showPassword ? "Hide" : "Show"}
                 aria-pressed={showPassword}
              >
                {showPassword ? (
                  <FiEyeOff className="w-3 h-3" />
                ) : (
                  <FiEye className="w-3 h-3" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="password-error"
                className="flex items-center space-x-1 text-xs text-red-600"
                role="alert"
              >
                <FiAlertCircle className="w-3 h-3" />
                <span>{errors.password.message}</span>
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={`w-full py-2 px-4 rounded-xl font-semibold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-orange-500/30 ${
              isLoading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl"
            }`}
            disabled={isLoading}
            aria-describedby={isLoading ? "loading-text" : undefined}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span id="loading-text">Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </motion.button>

           {/* Register Link */}
          {onNavigateToRegister && (
            <motion.div
              className="pt-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <p className="text-xs text-slate-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="font-semibold text-orange-600 transition-colors duration-200 hover:text-orange-700 focus:outline-none focus:underline"
                  disabled={isLoading}
                  style={{
                    padding: 0,
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
                >
                  Sign up
                </button>
              </p>
            </motion.div>
          )}

          

         
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
