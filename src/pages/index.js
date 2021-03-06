import request from '../utils/request'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import useAuthState from '../hooks/useAuthState'
import Layout from '../components/Layout'
import Project from '../components/Project'

export default function Home({ projects }) {
  const { user, loading } = useAuthState()

  return (
    <Layout user={user} loading={loading}>
      <Typography gutterBottom variant='h3' component='h1'>
        新着のプロジェクト
      </Typography>
      <Grid container spacing={6}>
        {projects.map(project => (
          <Grid key={project.id} item sm={6} md={4}>
            <Project project={project} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const res = await request.get('/projects')
  const { projects } = res.data

  return { props: { projects } }
}
