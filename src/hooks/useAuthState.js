import request from '../utils/request'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from '../utils/Firebase'

export default function useAuthState({ required } = {}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (required && !user) {
        router.push('/log_in')
        return
      }

      if (user) {
        const token = await user.getIdToken()
        const config = { headers: { authorization: `Token ${token}` } }
        const userFromAPI = await request.get('/users/me', config)
        Object.assign(user, userFromAPI.data)
      }

      setUser(user)
      setLoading(false)
    })
  }, [])

  return { user, loading }
}
