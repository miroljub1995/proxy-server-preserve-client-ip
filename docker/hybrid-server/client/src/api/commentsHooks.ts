import { useCallback, useEffect, useState } from 'react'
import t from 'runtime-cast'
import { ApiEndpoints } from './endpoints'
import { Comment, CommentSchema } from './types'

export const useCommentsByPost = (id: Comment['post_id'] | undefined) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [needFetch, setNeedFetch] = useState(true)
  const fetchComment = useCallback(async () => {
    if (id) {
      const res = await fetch(ApiEndpoints.comments_by_post_id(id))
      const responseJson = await res.json()
      const data = t.array(CommentSchema).cast(responseJson).sort((a, b) => b.date_created - a.date_created)
      setComments(data)
    }
  }, [setComments, id])
  useEffect(() => {
    setNeedFetch(false)
    fetchComment()
  }, [fetchComment, setNeedFetch, needFetch])

  const invalidate = useCallback(() => setNeedFetch(true), [setNeedFetch])
  return [comments, invalidate] as const
}