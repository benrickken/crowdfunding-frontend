import { useEffect, useState } from 'react'
import firebase from '../utils/Firebase'

export default function useAuthState() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  return { user, loading }
}
