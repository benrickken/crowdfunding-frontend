import useAuthState from '../hooks/useAuthState'
import Layout from '../components/Layout'
import SignUpForm from '../components/SignUpForm'

export default function SignUp() {
  const { user, loading } = useAuthState()

  return (
    <Layout user={user} loading={loading}>
      <SignUpForm />
    </Layout>
  )
}
