import { formatDistance } from 'date-fns'
import request from '../../utils/request'
import useSWR from 'swr'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import useAuthState from '../../hooks/useAuthState'
import Layout from '../../components/Layout'
import ProjectReturnList from '../../components/ProjectReturnList'
import CommentList from '../../components/CommentList'
import FavoriteButton from '../../components/FavoriteButton'

export default function ProjectsShow(props) {
  const classes = useStyles()
  const { user, loading } = useAuthState()
  const { data: project, mutate: mutateProject } = useSWR(`/projects/${props.project.id}`, projectFetcher, {
    initialData: props.project,
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Layout user={user} loading={loading}>
      <Grid container>
        <Grid item sm={6}>
          <Typography gutterBottom variant='h4' component='h1'>
            {project.title}
          </Typography>
        </Grid>
        <Grid item sm={6}>
          {user && <FavoriteButton project={project} mutateProject={mutateProject} />}
        </Grid>
        <Grid item sm={6}>
          <img src='https://static.camp-fire.jp/uploads/project_version/image/627521/6f7c647f-4dba-46a1-abe3-b1e9dc7588d0.jpg' />
        </Grid>
        <Grid item sm={6}>
          <Card>
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                合計金額
                {project.progress === 'completed' && <Chip className={classes.chip} size='small' label='達成済' />}
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
                募集終了まで残り
              </Typography>
              <Typography variant='h3'>{formatDistance(new Date(project.dueDate), new Date())}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography className={classes.title} variant='h5'>
        リターンを選ぶ
      </Typography>

      <ProjectReturnList projectId={project.id} mutateProject={mutateProject} />

      <Typography className={classes.title} variant='h5'>
        コメント
      </Typography>

      <CommentList projectId={project.id} />
    </Layout>
  )
}

const projectFetcher = url => request.get(url).then(res => res.data.project)

export async function getServerSideProps(context) {
  const { id } = context.params
  const project = await projectFetcher(`/projects/${id}`)

  return { props: { project } }
}

const useStyles = makeStyles({
  title: {
    margin: '30px 0',
  },
  chip: {
    marginLeft: 10,
  },
})
