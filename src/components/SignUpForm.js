import request from '../utils/request'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import firebase from '../utils/Firebase'

export default function SignUpForm() {
  const classes = useStyles()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      router.push('/') // Redirect and unmount before the following request to avoid error in useAuthState
      await request.post('/users', { name, email })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          新規登録
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='ユーザー名'
            name='name'
            autoComplete='name'
            autoFocus
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='メールアドレス'
            name='email'
            type='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='パスワード'
            name='password'
            type='password'
            autoComplete='current-password'
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            新規登録
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/log_in' variant='body2'>
                ログインはこちら
              </Link>
            </Grid>
          </Grid>
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
