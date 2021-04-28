import axios from 'axios'
import { APIEndpoints } from '../../constants'
import useAuthState from '../../hooks/useAuthState'
import Layout from '../../components/Layout'
import Project from '../../components/Project'

export default function ProjectsShow({ project }) {
  const { user, loading } = useAuthState()

  return (
    <Layout user={user} loading={loading}>
      <Project key={project.id} project={project} />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params
  const res = await axios.get(`${APIEndpoints.PROJECTS}/${id}`)
  const { project } = res.data

  return { props: { project } }
}
