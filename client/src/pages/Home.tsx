import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import SplashScreen from '../components/SplashScreen'

export default function Home() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <SplashScreen
        onContinue={() => navigate('/login')}
        onCreateAccount={() => navigate('/register')}
      />
    </motion.div>
  )
}
