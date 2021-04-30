import axios from 'axios'
import { APIEndpoints } from '../../constants'
import useAuthState from '../../hooks/useAuthState'
import Layout from '../../components/Layout'
import Project from '../../components/Project'
import ProjectReturn from '../../components/ProjectReturn'

export default function ProjectsShow({ project }) {
  const { user, loading } = useAuthState()

  return (
    <Layout user={user} loading={loading}>
      <Project project={project} />
      <div>Returns:</div>

      {project.projectReturns.map(projectReturn => (
        <ProjectReturn key={projectReturn.id} projectReturn={projectReturn} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params
  const res = await axios.get(`${APIEndpoints.PROJECTS}/${id}`)
  const { project } = res.data

  return { props: { project } }
}
