import axios from 'axios'
import { APIEndpoints } from '../constants'
import useAuthState from '../hooks/useAuthState'
import Layout from '../components/Layout'
import Project from '../components/Project'

export default function Home({ projects }) {
  const { user, loading } = useAuthState()

  return (
    <Layout user={user} loading={loading}>
      {projects.map(project => (
        <Project key={project.id} project={project} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const res = await axios.get(APIEndpoints.PROJECTS)
  const { projects } = res.data

  return { props: { projects } }
}
