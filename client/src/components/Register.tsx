
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useDevToolsDebug, usePerformanceMonitor } from "../utils/devtools";
import {
  FiUserPlus,
  FiAlertTriangle,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiLoader,
} from "react-icons/fi";

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterProps {
  onSubmit: (data: Omit<RegisterFormData, "confirmPassword">) => void;
  onNavigateToLogin: () => void;
  isLoading?: boolean;
  error?: string;
}

// Zod schema for form validation
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name must not exceed 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must not exceed 100 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const Register: React.FC<RegisterProps> = ({
  onSubmit,
  onNavigateToLogin,
  isLoading = false,
  error,
}) => {
  const [showPasswords, setShowPasswords] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  // DevTools debugging hooks (only active in development)
  const formValues = watch();
  useDevToolsDebug("Register", { formValues, errors, isLoading, error });
  usePerformanceMonitor("Register");

  const onValidSubmit = (data: RegisterFormData) => {
    if (isLoading) return;
    const { confirmPassword, ...registerData } = data;
    onSubmit(registerData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top hero to match Login */}
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

        {/* Center icon avatar to echo Login */}
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
            <FiUserPlus className="w-10 h-10 text-orange-600" />
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
              Create Account
            </h1>
            <p className="text-sm text-gray-600">Sign up to get started</p>
          </div>

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
                  <FiAlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Name Field */}
          <motion.div
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-left text-gray-800"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-4 py-2 border rounded-xl text-gray-900 placeholder-slate-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 ${
                errors.name
                  ? "border-red-500 bg-red-900/20"
                  : "border-slate-300 hover:border-slate-400"
              } ${isLoading ? "bg-slate-100 cursor-not-allowed" : ""}`}
              disabled={isLoading}
              autoComplete="name"
              placeholder="John Doe"
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p
                id="name-error"
                className="flex items-center space-x-1 text-xs text-red-600"
                role="alert"
              >
                <FiAlertCircle className="w-3 h-3" />
                <span>{errors.name.message}</span>
              </p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
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
            transition={{ duration: 0.4, delay: 0.4 }}
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
                type={showPasswords ? "text" : "password"}
                className={`w-full px-4 py-2 pr-12 border rounded-xl text-gray-900 placeholder-slate-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 ${
                  errors.password
                    ? "border-red-500 bg-red-900/20"
                    : "border-slate-300 hover:border-slate-400"
                } ${isLoading ? "bg-slate-100 cursor-not-allowed" : ""}`}
                disabled={isLoading}
                autoComplete="new-password"
                placeholder="••••••••"
                aria-describedby={errors.password ? "password-error" : undefined}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute text-gray-500 transition-colors -translate-y-1/2 mini-btn right-3 top-1/2 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                disabled={isLoading}
                aria-label={showPasswords ? "Hide" : "Show"}
                aria-pressed={showPasswords}
              >
                {showPasswords ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
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

          {/* Confirm Password Field */}
          <motion.div
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-left text-gray-800"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPasswords ? "text" : "password"}
                className={`w-full px-4 py-2 pr-12 border rounded-xl text-gray-900 placeholder-slate-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 ${
                  errors.confirmPassword
                    ? "border-red-500 bg-red-900/20"
                    : "border-slate-300 hover:border-slate-400"
                } ${isLoading ? "bg-slate-100 cursor-not-allowed" : ""}`}
                disabled={isLoading}
                autoComplete="new-password"
                placeholder="••••••••"
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute text-gray-500 transition-colors -translate-y-1/2 mini-btn right-3 top-1/2 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                disabled={isLoading}
                aria-label={showPasswords ? "Hide" : "Show"}
                aria-pressed={showPasswords}
              >
                {showPasswords ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p
                id="confirmPassword-error"
                className="flex items-center space-x-1 text-xs text-red-600"
                role="alert"
              >
                <FiAlertCircle className="w-3 h-3" />
                <span>{errors.confirmPassword.message}</span>
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
            transition={{ duration: 0.4, delay: 0.6 }}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <FiLoader className="w-5 h-5 text-white animate-spin" aria-hidden="true" />
                <span id="loading-text">Creating account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </motion.button>

          {/* Login Link */}
          <motion.div
            className="pt-2 text-center border-slate-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="font-semibold text-orange-600 transition-colors duration-200 hover:text-orange-700 focus:outline-none focus:underline"
                disabled={isLoading}
                 style={{
                    padding: 0,
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
              >
                Sign in
              </button>
            </p>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Register;