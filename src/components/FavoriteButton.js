import useSWR from 'swr'
import request from '../utils/request'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

export default function FavoriteButton({ projectId, favoritedCount, mutateProject }) {
  const { data: favorite, mutate: mutateFavorite } = useSWR(`/projects/${projectId}/favorite`, favoriteFetcher)
  if (favorite === undefined) {
    return null
  }

  const isFavorited = favorite !== null

  const handleClick = async () => {
    if (isFavorited) {
      await request.delete(`/projects/${projectId}/favorite`)
    } else {
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
