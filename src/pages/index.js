import axios from 'axios'
import { APIEndpoints } from '../constants'
import Layout from '../components/Layout'
import Project from '../components/Project'

export default function Home({ projects }) {
  return (
    <Layout>
      {projects.map(project => (
        <Project project={project} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const res = await axios.get(APIEndpoints.PROJECTS)
  const { projects } = res.data

  return { props: { projects } }
}
