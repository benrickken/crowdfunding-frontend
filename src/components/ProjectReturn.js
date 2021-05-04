import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

export default function ProjectReturn({ projectReturn, handleSupportButtonClick }) {
  const classes = useStyles()

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image='https://static.camp-fire.jp/uploads/project_reward_version/image/2203153/05cb9f2e-108b-4bb3-bf5e-66370cda15c7.jpg?ixlib=rails-2.1.4&fit=max&auto=format&w=1120'
          title={projectReturn.title}
        />
        <CardContent>
          <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
            金額: ¥ {projectReturn.price}
          </Typography>

          <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
            支援者数: {projectReturn.supportersCount} (最大: {projectReturn.capacity})
          </Typography>

          <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
            お届予定: {projectReturn.deliveryDate}
          </Typography>

          <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
            {projectReturn.description}
          </Typography>

          <Button onClick={handleSupportButtonClick(projectReturn.id)} fullWidth variant='contained' color='secondary'>
            支援する
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

const useStyles = makeStyles({
  media: {
    height: 140,
  },
})
