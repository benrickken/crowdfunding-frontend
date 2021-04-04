import { useContext } from 'react'
import Link from 'next/Link'
import styles from './Header.module.scss'
import { AuthContext } from '../contexts/Auth'

export default function Header() {
  const { currentUser } = useContext(AuthContext)

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
              <Link href='/'>
                <a>{currentUser.email}</a>
              </Link>
            ) : (
              <Link href='/sign_up'>
                <a>Sign up</a>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
