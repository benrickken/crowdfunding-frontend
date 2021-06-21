import Link from 'next/link'
import { useState, useRef } from 'react'
import request from '../utils/request'
import useSWR from 'swr'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import NotificationsIcon from '@material-ui/icons/Notifications'

export default function HeaderNotificationMenu({ unreadNotificationsCount }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const notificationAnchorRef = useRef(null)
  const { data: notifications } = useSWR('/me/notifications', notificationsFetcher)

  const handleNotificationOpen = () => {
    setIsNotificationOpen(true)
    request.patch('/me/read_notifications')
  }

  const handleNotificationClose = () => {
    setIsNotificationOpen(false)
  }

  return (
    <>
      <IconButton color='inherit' onClick={handleNotificationOpen} ref={notificationAnchorRef}>
        <Badge badgeContent={unreadNotificationsCount} color='secondary'>
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
    </>
  )
}

const notificationsFetcher = url => request.get(url).then(res => res.data.notifications)
