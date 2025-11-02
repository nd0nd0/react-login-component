import { useNavigate } from 'react-router'
import Login, { type LoginFormData } from '../components/Login'
import { useLoginMutation } from '../hooks/useLoginMutation'

export default function LoginPage() {
  const navigate = useNavigate()
  const loginMutation = useLoginMutation()

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      })

      if (response.ok && response.user) {
        // Navigate to Home and pass the user for now (zustand/store will replace this)
        navigate('/', { state: { user: response.user } })
      }
    } catch (err) {
      // Error surfaced via mutation.error
      console.error('Login failed:', err)
    }
  }

  return (
    <Login
      onSubmit={handleLogin}
      onNavigateToRegister={() => navigate('/register')}
      isLoading={loginMutation.isPending}
      error={loginMutation.error?.message || ''}
    />
  )
}
