import axios from 'axios'
import firebase from '../utils/Firebase'

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

request.interceptors.request.use(
  async config => {
    const { currentUser } = firebase.auth()
    if (currentUser) {
      const token = await currentUser.getIdToken()
      config.headers.authorization = `Token ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
