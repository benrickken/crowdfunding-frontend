import Head from 'next/head'
import Header from './Header'
import styles from './Layout.module.scss'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Crowdfunding</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main>
        <div className={styles.container}>{children}</div>
      </main>
    </>
  )
}
