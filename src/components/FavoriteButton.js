import useSWR from 'swr'
import request from '../utils/request'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

export default function FavoriteButton({ projectId, favoritedCount, mutateProject, project }) {
  const { data: favorite, mutate: mutateFavorite } = useSWR(`/projects/${projectId}/favorite`, favoriteFetcher)
  if (favorite === undefined) {
    return null
  }

  console.log('data', favorite)
  console.log('favoritedCount', favoritedCount)
  console.log('project', project)

  const isFavorited = favorite !== null

  const handleClick = async () => {
    console.log('clicked!!!!')
    if (isFavorited) {
      console.log('isFavorited')
      mutateFavorite(null, false)
      mutateProject({...project, favoritedCount: project.favoritedCount--}, false)
      await request.delete(`/projects/${projectId}/favorite`)
    } else {
      console.log('isNotFavorited')
      mutateFavorite({id: 0}, false)
      mutateProject({...project, favoritedCount: project.favoritedCount++}, false)
      await request.post(`/projects/${projectId}/favorite`)
    }

    mutateFavorite()
    mutateProject()
  }

  return (
    <Button onClick={handleClick} color='secondary' variant={isFavorited ? 'contained' : 'outlined'}>
      {isFavorited ? <FavoriteIcon fontSize='small' /> : <FavoriteBorderIcon fontSize='small' />}
      お気に入り ({favoritedCount})
    </Button>
  )
}

const favoriteFetcher = url => request.get(url).then(res => res.data.favorite)
