import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { APIEndpoints } from '../../constants'
import useAuthState from '../../hooks/useAuthState'
import Layout from '../../components/Layout'
import ProjectReturn from '../../components/ProjectReturn'

export default function ProjectsShow({ project, projectReturns }) {
  const classes = useStyles()
  const { user, loading } = useAuthState()

  return (
    <Layout user={user} loading={loading}>
      <Typography gutterBottom variant='h4' component='h1'>
        {project.title}
      </Typography>

      <Grid container>
        <Grid item sm={6}>
          <img src='https://static.camp-fire.jp/uploads/project_version/image/627521/6f7c647f-4dba-46a1-abe3-b1e9dc7588d0.jpg' />
        </Grid>
        <Grid item sm={6}>
          <Card>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                合計金額
              </Typography>
              <Typography variant='h3' gutterBottom>
                ¥ {project.supportedAmount} (目標: ¥ {project.targetAmount})
              </Typography>
              <Typography color='textSecondary' gutterBottom>
                支援者数
              </Typography>
              <Typography variant='h3' gutterBottom>
                {project.supportersCount} 人
              </Typography>
              <Typography color='textSecondary' gutterBottom>
                募集終了日
              </Typography>
              <Typography variant='h3'>{project.dueDate}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography className={classes.return} variant='h5'>
        リターンを選ぶ
      </Typography>

      <Grid container spacing={6}>
        {projectReturns.map(projectReturn => (
          <Grid key={projectReturn.id} item sm={6} md={4}>
            <ProjectReturn projectReturn={projectReturn} user={user} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params
  const resForProject = await axios.get(`${APIEndpoints.PROJECTS}/${id}`)
  const { project } = resForProject.data
  const resForProjectReturns = await axios.get(`${APIEndpoints.PROJECTS}/${id}/project_returns`)
  const { projectReturns } = resForProjectReturns.data

  return { props: { project, projectReturns } }
}

const useStyles = makeStyles({
  return: {
    margin: '30px 0',
  },
})
