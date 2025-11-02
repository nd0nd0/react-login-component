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
        // Navigate to dashboard; pass user in navigation state for now
        navigate('/dashboard', { state: { user: response.user } })
      }
    } catch (err) {
      // Error already surfaced via mutation.error
      // No-op
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
