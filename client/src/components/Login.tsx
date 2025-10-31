import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useDevToolsDebug, usePerformanceMonitor } from "../utils/devtools";

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
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const Login: React.FC<LoginProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
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
      className="h-screen max-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
            <svg
              className="w-10 h-10 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
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
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
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
              className={`w-full px-4 py-3.5 border rounded-xl text-gray-900 placeholder-slate-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 ${
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
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
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
            <input
              id="password"
              type="password"
              className={`w-full px-4 py-3.5 border rounded-xl text-gray-900 placeholder-slate-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 ${
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
            {errors.password && (
              <p
                id="password-error"
                className="flex items-center space-x-1 text-xs text-red-600"
                role="alert"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errors.password.message}</span>
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-orange-500/30 ${
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

          {/* Demo Info */}
          <motion.div
            className="pt-2 border-t border-slate-200"
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
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
