import useSWR from 'swr'
import request from '../utils/request'
import Box from '@material-ui/core/Box'
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
      <Box mb={5}>
        <Typography gutterBottom variant='h3'>
          支援したプロジェクト
        </Typography>
        {backedProjects && backedProjects.length > 0 ? (
          <Grid container>
            {backedProjects.map(project => (
              <Grid key={project.id} item sm={6} md={4}>
                <Project project={project} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>支援したプロジェクトはありません</Typography>
        )}
      </Box>

      <Box mb={5}>
        <Typography gutterBottom variant='h3'>
          投稿したプロジェクト
        </Typography>
        {projects && projects.length > 0 ? (
          <Grid container>
            {projects.map(project => (
              <Grid key={project.id} item sm={6} md={4}>
                <Project project={project} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>投稿したプロジェクトはありません</Typography>
        )}
      </Box>
    </>
  )
}
