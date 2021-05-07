import useSWR from 'swr'
import request from '../utils/request'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Project from '../components/Project'

const projectsFetcher = url => request.get(url).then(res => res.data.projects)
const backedProjectsFetcher = url => request.get(url).then(res => res.data.backedProjects)

export default function Dashboard() {
  const { data: projects } = useSWR('/me/projects', projectsFetcher)
  const { data: backedProjects } = useSWR('/me/backed_projects', backedProjectsFetcher)

  return (
    <>
      <Typography gutterBottom variant='h3' component='h1'>
        支援したプロジェクト
      </Typography>
      {backedProjects && (
        <Grid container spacing={6}>
          {backedProjects.map(project => (
            <Grid key={project.id} item sm={6} md={4}>
              <Project project={project} />
            </Grid>
          ))}
        </Grid>
      )}

      <Typography gutterBottom variant='h3' component='h1'>
        投稿したプロジェクト
      </Typography>
      {projects && (
        <Grid container spacing={6}>
          {projects.map(project => (
            <Grid key={project.id} item sm={6} md={4}>
              <Project project={project} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}
