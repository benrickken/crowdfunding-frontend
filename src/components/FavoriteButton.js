import useSWR from 'swr'
import request from '../utils/request'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

export default function FavoriteButton({ project, mutateProject }) {
  const { data: favorite, mutate: mutateFavorite } = useSWR(`/projects/${project.id}/favorite`, favoriteFetcher)
  if (favorite === undefined) {
    return null
  }

  const isFavorited = favorite !== null

  const handleClick = async () => {
    if (isFavorited) {
      mutateFavorite(null, false)
      mutateProject({ ...project, favoritedCount: project.favoritedCount-- }, false)

      await request.delete(`/projects/${project.id}/favorite`)
    } else {
      mutateFavorite({ id: 0 }, false)
      mutateProject({ ...project, favoritedCount: project.favoritedCount++ }, false)

      await request.post(`/projects/${project.id}/favorite`)
    }

    mutateFavorite()
    mutateProject()
  }

  return (
    <Button onClick={handleClick} color='secondary' variant={isFavorited ? 'contained' : 'outlined'}>
      {isFavorited ? <FavoriteIcon fontSize='small' /> : <FavoriteBorderIcon fontSize='small' />}
      お気に入り ({project.favoritedCount})
    </Button>
  )
}

const favoriteFetcher = url => request.get(url).then(res => res.data.favorite)
