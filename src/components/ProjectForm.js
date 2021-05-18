import request from '../utils/request'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import ProjectReturnForm from './ProjectReturnForm'

export default function ProjectForm() {
  const classes = useStyles()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [description, setDescription] = useState('')
  const [projectReturn, setProjectReturn] = useState({})

  const handleSubmit = async event => {
    event.preventDefault()

    const projectParams = {
      title,
      target_amount: targetAmount,
      due_date: dueDate,
      description,
      project_returns_attributes: [projectReturn],
    }

    try {
      await request.post('/projects', projectParams)

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container component='main' maxWidth='sm'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h4'>
          プロジェクトの作成
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='タイトル'
            name='title'
            autoComplete='title'
            autoFocus
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            type='number'
            label='目標金額'
            name='target_amount'
            InputProps={{ startAdornment: <InputAdornment position='start'>¥</InputAdornment> }}
            value={targetAmount}
            onChange={event => setTargetAmount(event.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            type='date'
            label='募集終了日'
            name='due_date'
            InputLabelProps={{
              shrink: true,
            }}
            value={dueDate}
            onChange={event => setDueDate(event.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            multiline
            label='説明'
            name='description'
            autoComplete='description'
            autoFocus
            value={description}
            onChange={event => setDescription(event.target.value)}
          />

          <input accept='image/*' hidden id='contained-button-file' multiple type='file' />
          <label htmlFor='contained-button-file'>
            <Button variant='contained' color='primary' component='span'>
              画像のアップロード
            </Button>
          </label>

          <ProjectReturnForm setProjectReturn={setProjectReturn} />

          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            作成
          </Button>
        </form>
      </div>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
