import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from '../utils/Firebase'

export default function useAuthState({ required } = {}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (required && !user) {
        router.push('/log_in')
        return
      }

      setUser(user)
      setLoading(false)
    })
  }, [])

  return { user, loading }
}
