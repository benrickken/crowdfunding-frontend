import { useState } from 'react'
import { useRouter } from 'next/router'
import firebase from '../utils/Firebase'

export default function LogInForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='email'
        name='email'
        placeholder='メールアドレス'
        value={email}
        onChange={event => setEmail(event.target.value)}
      />
      <input
        type='password'
        name='password'
        placeholder='パスワード'
        value={password}
        onChange={event => setPassword(event.target.value)}
      />

      <button type='submit'>ログイン</button>
    </form>
  )
}
