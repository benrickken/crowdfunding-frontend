import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src='/logo.svg' alt='Crowdfunding Logo' />
        </div>
        <nav className={styles.headerNav}>
          <ul>
            <li>
              <a>Log in</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
