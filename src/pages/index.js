import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { APIEndpoints } from '../constants'
import useAuthState from '../hooks/useAuthState'
import Layout from '../components/Layout'
import Project from '../components/Project'

export default function Home({ projects }) {
  const { user, loading } = useAuthState()

  return (
    <Layout user={user} loading={loading}>
      <Typography gutterBottom variant='h3' component='h1'>
        Projects
      </Typography>
      <Grid container spacing={6}>
        {projects.map(project => (
          <Grid key={project.id} item xs={12} sm={6} md={4}>
            <Project project={project} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const res = await axios.get(APIEndpoints.PROJECTS)
  const { projects } = res.data

  return { props: { projects } }
}
