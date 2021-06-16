import request from '../utils/request'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export default function CommentForm({ projectId, mutateComment }) {
  const classes = useStyles()
  const [body, setBody] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await request.post(`/projects/${projectId}/comments`, { body })
      mutateComment()
      setBody('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        multiline
        label='プロジェクトに対する意見や質問を投稿しましょう'
        name='body'
        autoComplete='body'
        autoFocus
        value={body}
        onChange={event => setBody(event.target.value)}
      />

      <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
        コメントする
      </Button>
    </form>
  )
}

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  submit: {
    width: 200,
    marginBottom: theme.spacing(3),
  },
}))
