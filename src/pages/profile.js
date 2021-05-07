import useAuthState from '../hooks/useAuthState'
import Layout from '../components/Layout'
import Dashboard from '../components/Dashboard'

export default function Profile() {
  const { user, loading } = useAuthState({ required: true })

  return (
    <Layout user={user} loading={loading}>
      {user ? <Dashboard /> : <div>Loading...</div>}
    </Layout>
  )
}
