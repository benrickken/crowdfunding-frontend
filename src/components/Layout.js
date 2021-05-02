import Head from 'next/head'
import Header from './Header'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

export default function Layout({ user, loading = false, children }) {
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>Crowdfunding</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header user={user} loading={loading} />

      <main>
        <Container className={classes.container}>{children}</Container>
      </main>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 100,
  },
}))
