import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router'

interface User {
  id?: number
  email: string
  name?: string
}

type LocationState = {
  user?: User
}

export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state || {}) as LocationState
  const user = state.user

  // If no user data, redirect to home
  if (!user) {
    navigate('/')
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen max-h-screen bg-white"
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
        className="flex items-center justify-center min-h-[65vh]"

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
            type="button"
            className="w-full px-4 py-2 font-semibold text-white transition-all duration-200 ease-in-out bg-red-600 shadow-lg rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/30 hover:bg-red-700 hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
          >
            Logout
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}