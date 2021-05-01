import Head from 'next/head'
import Header from './Header'
import Container from '@material-ui/core/Container'

export default function Layout({ user, loading = false, children }) {
  return (
    <>
      <Head>
        <title>Crowdfunding</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header user={user} loading={loading} />

      <main>
        <Container>{children}</Container>
      </main>
    </>
  )
}
