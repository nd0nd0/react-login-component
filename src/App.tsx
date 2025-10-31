import { useState } from 'react'
import { motion } from 'framer-motion'
import Login from './components/Login'
import SplashScreen from './components/SplashScreen'
import type { LoginFormData } from './components/Login'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [user, setUser] = useState<LoginFormData | null>(null)

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate login validation
      if (data.email === 'admin@example.com' && data.password === 'password123') {
        setUser(data)
        console.log('Login successful:', data)
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setShowSplash(true)
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
        className="flex items-center justify-center max-h-screen p-4 bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full max-w-full p-6 text-center border rounded-lg shadow-2xl bg-slate-800 border-slate-700 sm:p-8">
          <div className="mb-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-600 rounded-full">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
              Welcome!
            </h1>
            <p className="text-slate-300 wrap-break-word">
              {user.email}
            </p>
          </div>
          
          <div className="mb-6">
            <p className="mb-4 text-slate-400">
              You have successfully logged in to your account.
            </p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-3 font-medium text-white transition duration-200 ease-in-out transform bg-red-600 rounded-lg hover:bg-red-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/30"
          >
            Logout
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="max-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Login onSubmit={handleLogin} isLoading={isLoading} error={error} />
    </motion.div>
  )
}

export default App
