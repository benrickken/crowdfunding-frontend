import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { APIEndpoints } from '../constants'

export default function ProjectForm({ user }) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()

    const projectParams = {
      title,
      target_amount: targetAmount,
      due_date: dueDate,
      description,
    }

    try {
      const token = await user.getIdToken()
      const config = { headers: { authorization: `Token ${token}` } }
      await axios.post(APIEndpoints.PROJECTS, projectParams, config)

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name='title' placeholder='タイトル' value={title} onChange={event => setTitle(event.target.value)} />
      <input
        type='number'
        name='target_amount'
        placeholder='目標金額'
        value={targetAmount}
        onChange={event => setTargetAmount(event.target.value)}
      />
      <input
        type='date'
        name='due_date'
        placeholder='募集終了日'
        value={dueDate}
        onChange={event => setDueDate(event.target.value)}
      />
      <textarea
        name='description'
        placeholder='概要'
        value={description}
        onChange={event => setDescription(event.target.value)}
      />

      <button type='submit'>作成</button>
    </form>
  )
}
