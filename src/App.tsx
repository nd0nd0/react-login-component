import { useState } from 'react'
import Login from './components/Login'
import type { LoginFormData } from './components/Login'

function App() {
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
  }

  if (user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome!
            </h1>
            <p className="text-slate-300 wrap-break-word">
              {user.email}
            </p>
          </div>
          
          <div className="mb-6">
            <p className="text-slate-400 mb-4">
              You have successfully logged in to your account.
            </p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/30"
          >
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Login onSubmit={handleLogin} isLoading={isLoading} error={error} />
    </div>
  )
}

export default App
