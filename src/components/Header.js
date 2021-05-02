import Link from 'next/Link'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import firebase from '../utils/Firebase'

export default function Header({ user, loading }) {
  const classes = useStyles()

  const logOut = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link href='/'>
          <Typography variant='h6' className={classes.title}>
            Crowdfunding
          </Typography>
        </Link>
        {!loading &&
          (user ? (
            <>
              <Link href='/projects/new'>
                <Button color='inherit'>はじめる</Button>
              </Link>
              <Link href='/'>
                <Button color='inherit'>{user.name}</Button>
              </Link>
              <a style={{ cursor: 'pointer' }} onClick={logOut}>
                <Button color='inherit'>Log out</Button>
              </a>
            </>
          ) : (
            <>
              <Link href='/log_in'>
                <Button color='inherit'>Login</Button>
              </Link>
              <Link href='/sign_up'>
                <Button color='inherit'>Sign up</Button>
              </Link>
            </>
          ))}
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))
