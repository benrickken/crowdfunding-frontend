import request from '../../utils/request'
import useSWR from 'swr'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import useAuthState from '../../hooks/useAuthState'
import Layout from '../../components/Layout'
import ProjectReturn from '../../components/ProjectReturn'

export default function ProjectsShow(props) {
  const classes = useStyles()
  const { user, loading } = useAuthState()
  const { data: project, mutate: mutateProject } = useSWR(`/projects/${props.project.id}`, projectFetcher, {
    initialData: props.project,
  })
  const { data: projectReturns, mutate: mutateProjectReturns } = useSWR(
    `/projects/${props.project.id}/project_returns`,
    projectReturnsFetcher,
    {
      initialData: props.projectReturns,
    }
  )

  const handleSupportButtonClick = projectReturnId => async event => {
    event.preventDefault()

    try {
      await request.post('/project_supports', { project_return_id: projectReturnId })
      mutateProject()
      mutateProjectReturns()
    } catch (error) {
      console.log(error)
    }
  }

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
            <ProjectReturn projectReturn={projectReturn} handleSupportButtonClick={handleSupportButtonClick} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

const projectFetcher = url => request.get(url).then(res => res.data.project)
const projectReturnsFetcher = url => request.get(url).then(res => res.data.projectReturns)

export async function getServerSideProps(context) {
  const { id } = context.params
  const project = await projectFetcher(`/projects/${id}`)
  const projectReturns = await projectReturnsFetcher(`/projects/${id}/project_returns`)

  return { props: { project, projectReturns } }
}

const useStyles = makeStyles({
  return: {
    margin: '30px 0',
  },
})
