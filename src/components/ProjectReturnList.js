import request from '../utils/request'
import useSWR from 'swr'
import Grid from '@material-ui/core/Grid'
import ProjectReturn from '../components/ProjectReturn'

export default function ProjectReturnList({ projectId, mutateProject }) {
  const { data: projectReturns, mutate: mutateProjectReturns } = useSWR(
    `/projects/${projectId}/project_returns`,
    projectReturnsFetcher
  )

  const handleSupportButtonClick = projectReturnId => async event => {
    event.preventDefault()

    try {
      await request.post('/project_supports', { project_return_id: projectReturnId })
      mutateProject()
      mutateProjectReturns()
    } catch (error) {
      console.log(error)
    }
  }

  if (!projectReturns) {
    return null
  }

  return (
    <Grid container spacing={6}>
      {projectReturns.map(projectReturn => (
        <Grid key={projectReturn.id} item sm={6} md={4}>
          <ProjectReturn projectReturn={projectReturn} handleSupportButtonClick={handleSupportButtonClick} />
        </Grid>
      ))}
    </Grid>
  )
}

const projectReturnsFetcher = url => request.get(url).then(res => res.data.projectReturns)
