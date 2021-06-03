import { formatDistance } from 'date-fns'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'

export default function Project({ project }) {
  const classes = useStyles()

  return (
    <Link href={`/projects/${project.id}`}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={
            project.imageUrl ||
            'https://static.camp-fire.jp/uploads/project_version/image/627521/6f7c647f-4dba-46a1-abe3-b1e9dc7588d0.jpg'
          }
          title={project.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {project.title}
          </Typography>
          <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
            現在: {project.supportedAmount}円
            {project.progress === 'completed' && <Chip className={classes.chip} size='small' label='達成済' />}
          </Typography>
          <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
            支援者数: {project.supportersCount}人
          </Typography>
          <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
            残り: {formatDistance(new Date(project.dueDate), new Date())}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {project.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
  },
  media: {
    height: 140,
  },
  chip: {
    marginLeft: 10,
  },
})
