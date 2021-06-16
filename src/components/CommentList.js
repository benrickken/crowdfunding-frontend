import request from '../utils/request'
import useSWR from 'swr'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Comment from './Comment'

export default function CommentList({ projectId }) {
  const { data: comments } = useSWR(`/projects/${projectId}/comments`, commentsFetcher)

  if (!comments) {
    return null
  }

  return (
    <Container maxWidth='sm'>
      {comments.map(comment => (
        <Box key={comment.id} mb={2}>
          <Comment comment={comment} />
        </Box>
      ))}
    </Container>
  )
}

const commentsFetcher = url => request.get(url).then(res => res.data.comments)
