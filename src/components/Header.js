import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import firebase from '../utils/Firebase'
import HeaderNotificationMenu from './HeaderNotificationMenu'

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
          <Typography style={{ cursor: 'pointer' }} variant='h6' className={classes.title}>
            Crowdfunding
          </Typography>
        </Link>
        {!loading &&
          (user ? (
            <>
              <Link href='/projects/new'>
                <Button color='inherit'>はじめる</Button>
              </Link>
              <HeaderNotificationMenu />
              <Link href='/profile'>
                <Button color='inherit'>{user.name}</Button>
              </Link>
              <a style={{ cursor: 'pointer' }} onClick={logOut}>
                <Button color='inherit'>ログアウト</Button>
              </a>
            </>
          ) : (
            <>
              <Link href='/log_in'>
                <Button color='inherit'>ログイン</Button>
              </Link>
              <Link href='/sign_up'>
                <Button color='inherit'>新規登録</Button>
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
