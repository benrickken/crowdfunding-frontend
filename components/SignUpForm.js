import { useState } from 'react'
import axios from 'axios'
import { APIRoot, APIEndpoints } from '../constants'

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    axios
      .post(
        APIEndpoints.AUTH,
        {
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        { withCredentials: true }
      )
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
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
      <input
        type='password'
        name='password_confirmation'
        placeholder='確認用パスワード'
        value={passwordConfirmation}
        onChange={event => setPasswordConfirmation(event.target.value)}
      />

      <button type='submit'>登録</button>
    </form>
  )
}
