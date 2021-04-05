import { useContext } from 'react'
import Link from 'next/Link'
import styles from './Header.module.scss'
import { AuthContext } from '../contexts/Auth'
import firebase from '../utils/Firebase'

export default function Header() {
  const { currentUser } = useContext(AuthContext)

  const logOut = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href='/'>
            <a>
              <img src='/logo.svg' alt='Crowdfunding Logo' />
            </a>
          </Link>
        </div>
        <nav className={styles.headerNav}>
          <ul>
            {currentUser ? (
              <>
                <Link href='/'>
                  <a>{currentUser.email}</a>
                </Link>
                <a style={{ cursor: 'pointer' }} onClick={logOut}>
                  Log out
                </a>
              </>
            ) : (
              <>
                <Link href='/log_in'>
                  <a>Log in</a>
                </Link>
                <Link href='/sign_up'>
                  <a>Sign up</a>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
