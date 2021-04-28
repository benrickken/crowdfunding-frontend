import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import firebase from '../utils/Firebase'
import { APIEndpoints } from '../constants'

export default function SignUpForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)

      const { currentUser } = firebase.auth()
      const token = await currentUser.getIdToken()
      const config = { headers: { authorization: `Token ${token}` } }
      await axios.post(APIEndpoints.USERS, { name }, config)

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        placeholder='ユーザー名'
        value={name}
        onChange={event => setName(event.target.value)}
      />
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

      <button type='submit'>登録</button>
    </form>
  )
}
