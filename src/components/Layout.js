import Head from 'next/head'
import Header from './Header'
import styles from './Layout.module.scss'

export default function Layout({ user, loading = false, children }) {
  return (
    <>
      <Head>
        <title>Crowdfunding</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header user={user} loading={loading} />

      <main>
        <div className={styles.container}>{children}</div>
      </main>
    </>
  )
}
