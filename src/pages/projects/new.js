import useAuthState from '../../hooks/useAuthState'
import Layout from '../../components/Layout'
import ProjectForm from '../../components/ProjectForm'

export default function ProjectsNew() {
  const { user, loading } = useAuthState({ required: true })

  return <Layout>{!loading && <ProjectForm user={user} />}</Layout>
}
