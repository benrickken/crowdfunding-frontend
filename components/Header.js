import Link from 'next/Link'
import styles from './Header.module.scss'

export default function Header() {
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
            <Link href='/sign_up'>
              <a>Sign up</a>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  )
}
