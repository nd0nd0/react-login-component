import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import Login from './components/Login'
import Register from './components/Register'
import SplashScreen from './components/SplashScreen'
import type { LoginFormData } from './components/Login'
import type { RegisterFormData } from './components/Register'
import { useLoginMutation } from './hooks/useLoginMutation'
import { useRegisterMutation } from './hooks/useRegisterMutation'

interface User {
  id: number;
  email: string;
  name: string;
}

type AuthView = 'login' | 'register';

function App() {
  const isTest = import.meta.env.MODE === 'test'
  const [showSplash, setShowSplash] = useState(!isTest)
  const [user, setUser] = useState<User | null>(null)
  const [authView, setAuthView] = useState<AuthView>('login')
  
  const loginMutation = useLoginMutation()
  const registerMutation = useRegisterMutation()

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      })
      
      if (response.ok && response.user) {
        setUser(response.user)
        console.log('Login successful:', response.user)
      }
    } catch (err) {
      // Error is handled by the mutation and will be available via loginMutation.error
      console.error('Login failed:', err)
    }
  }

  const handleRegister = async (data: Omit<RegisterFormData, 'confirmPassword'>) => {
    try {
      const response = await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      
      if (response.ok && response.user) {
        setUser(response.user)
        console.log('Registration successful:', response.user)
      }
    } catch (err) {
      // Error is handled by the mutation and will be available via registerMutation.error
      console.error('Registration failed:', err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    loginMutation.reset()
    registerMutation.reset()
    setAuthView('login')
    setShowSplash(isTest ? false : true)
  }

  const handleNavigateToRegister = () => {
    setAuthView('register')
    loginMutation.reset()
  }

  const handleNavigateToLogin = () => {
    setAuthView('login')
    registerMutation.reset()
  }

  const handleContinueFromSplash = () => {
    setShowSplash(false)
  }

  // Show splash screen first
  if (showSplash) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <SplashScreen onContinue={handleContinueFromSplash} />
      </motion.div>
    )
  }

  if (user) {
    return (
      <motion.div
        className="bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Top hero to match Login/Register */}
        <motion.div
          className="relative flex flex-col h-[35vh] bg-linear-to-b from-orange-500 to-orange-600 rounded-b-[60px] shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative sparkles (subtle) */}
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

          {/* Center icon avatar */}
          <motion.div
            className="flex items-center justify-center flex-1"
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 120 }}
          >
            <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-xl">
              <FiCheck className="w-10 h-10 text-orange-600" aria-hidden="true" />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom content (details + action) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="max-w-md px-6 py-8 mx-auto space-y-6 md:py-6">
            <div className="text-left">
              <h1 className="mb-1 text-2xl font-bold text-gray-900">Welcome!</h1>
              <p className="text-sm text-gray-600">You're signed in as</p>
              <p className="mt-1 font-medium text-gray-800 wrap-break-word">{user.email}</p>
            </div>

            <p className="text-sm text-slate-600">
              You have successfully logged in to your account.
            </p>

            <motion.button
              onClick={handleLogout}
              type="button"
              className="w-full px-4 py-2 font-semibold text-white transition-all duration-200 ease-in-out bg-red-600 shadow-lg rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/30 hover:bg-red-700 hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Logout
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="bg-white "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {authView === 'login' ? (
        <Login 
          onSubmit={handleLogin}
          onNavigateToRegister={handleNavigateToRegister}
          isLoading={loginMutation.isPending} 
          error={loginMutation.error?.message || ''} 
        />
      ) : (
        <Register
          onSubmit={handleRegister}
          onNavigateToLogin={handleNavigateToLogin}
          isLoading={registerMutation.isPending}
          error={registerMutation.error?.message || ''}
        />
      )}
    </motion.div>
  )
}

export default App
