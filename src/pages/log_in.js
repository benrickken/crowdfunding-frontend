import useAuthState from '../hooks/useAuthState'
import Layout from '../components/Layout'
import LogInForm from '../components/LogInForm'

export default function LogIn() {
  const { user, loading } = useAuthState()

  return (
    <Layout user={user} loading={loading}>
      <LogInForm />
    </Layout>
  )
}
