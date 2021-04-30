import axios from 'axios'
import { APIEndpoints } from '../constants'

export default function ProjectReturn({ projectReturn, user }) {
  const handleSupportButtonClick = async event => {
    event.preventDefault()

    try {
      const token = await user.getIdToken()
      const config = { headers: { authorization: `Token ${token}` } }
      await axios.post(APIEndpoints.PROJECT_SUPPORTS, { project_return_id: projectReturn.id }, config)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>人数: {projectReturn.capacity}人</div>
      <div>金額: {projectReturn.price}円</div>
      <div>お届予定: {projectReturn.deliveryDate}</div>
      <div>{projectReturn.description}</div>
      <button onClick={handleSupportButtonClick}>支援する</button>
    </div>
  )
}
