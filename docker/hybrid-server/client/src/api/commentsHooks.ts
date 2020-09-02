import { useCallback, useEffect, useState } from 'react'
import t from 'runtime-cast'
import { ApiEndpoints } from './endpoints'
import { Comment, CommentSchema } from './types'

export const useCommentsByPost = (id: Comment['post_id'] | undefined) => {
  const [comments, setComments] = useState<Comment[]>([])
  const fetchComment = useCallback(async () => {
    if (id) {
      const res = await fetch(ApiEndpoints.comments_by_post_id(id))
      const responseJson = await res.json()
      const data = t.array(CommentSchema).cast(responseJson)
      setComments(data)
    }
  }, [setComments, id])
  useEffect(() => {
    fetchComment()
  }, [fetchComment])
  return comments
}