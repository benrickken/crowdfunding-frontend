import Link from 'next/link'
import { useState, useRef } from 'react'
import request from '../utils/request'
import useSWR from 'swr'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import NotificationsIcon from '@material-ui/icons/Notifications'
import firebase from '../utils/Firebase'

export default function Header({ user, loading }) {
  const classes = useStyles()
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const notificationAnchorRef = useRef(null)
  const { data: notifications } = useSWR('/me/notifications', notificationsFetcher)

  const logOut = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.log(error)
    }
  }

  const handleNotificationOpen = () => {
    setIsNotificationOpen(true)
  }

  const handleNotificationClose = () => {
    setIsNotificationOpen(false)
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
              <IconButton color='inherit' onClick={handleNotificationOpen} ref={notificationAnchorRef}>
                <Badge badgeContent={notifications && notifications.length} color='secondary'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={notificationAnchorRef.current}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={isNotificationOpen}
                onClose={handleNotificationClose}
              >
                {notifications && notifications.length > 0 ? (
                  notifications.map(notification => (
                    <MenuItem key={notification.id}>
                      {notification.link !== null ? (
                        <Link href={notification.link}>{notification.body}</Link>
                      ) : (
                        notification.body
                      )}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>通知はありません</MenuItem>
                )}
              </Menu>
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

const notificationsFetcher = url => request.get(url).then(res => res.data.notifications)

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))
