import { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

export default function ProjectReturnForm({ setProjectReturn }) {
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [capacity, setCapacity] = useState('')

  useEffect(() => {
    setProjectReturn({
      price: price,
      description: description,
      delivery_date: deliveryDate,
      capacity: capacity,
    })
  }, [price, description, deliveryDate, capacity])

  return (
    <>
      <Typography variant='h5'>リターンの追加</Typography>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        type='number'
        label='金額'
        name='price'
        InputProps={{ startAdornment: <InputAdornment position='start'>¥</InputAdornment> }}
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        multiline
        label='内容'
        name='description'
        autoComplete='description'
        autoFocus
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        type='date'
        label='お届け予定'
        name='delivery_date'
        InputLabelProps={{
          shrink: true,
        }}
        value={deliveryDate}
        onChange={event => setDeliveryDate(event.target.value)}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        type='number'
        label='募集人数'
        name='capacity'
        value={capacity}
        onChange={event => setCapacity(event.target.value)}
      />
    </>
  )
}
