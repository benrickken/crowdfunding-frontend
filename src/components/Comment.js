import { format } from 'date-fns'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default function Comment({ comment }) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant='body2' component='p'>
          {comment.body}
        </Typography>
        <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
          {comment.user.name} {format(new Date(comment.createdAt), 'P p')}
        </Typography>
      </CardContent>
    </Card>
  )
}
