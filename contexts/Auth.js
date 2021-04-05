import { createContext, useEffect, useState } from 'react'
import firebase from '../utils/Firebase'

const AuthContext = createContext({ currentUser: null })

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
    })
  }, [])

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
