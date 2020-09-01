import { useCallback, useEffect, useState } from "react"
import { ApiEndpoints } from './endpoints'
import { Post, PostSchema } from './types'
import t from 'runtime-cast'

export const useWhatsNew = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const fetchNewPosts = useCallback(async () => {
    const res = await fetch(ApiEndpoints.posts_whatsNew)
    const responseJson = await res.json()
    const data = t.array(PostSchema).cast(responseJson)
    setPosts(data)
  }, [setPosts])
  useEffect(() => {
    fetchNewPosts()
  }, [fetchNewPosts])
  return posts
}

export const usePost = (id: Post["_id"]) => {
  const [post, setPost] = useState<Post | null>(null)
  const fetchPost = useCallback(async () => {
    const res = await fetch(ApiEndpoints.posts(id))
    const responseJson = await res.json()
    const data = PostSchema.cast(responseJson)
    setPost(data)
  }, [setPost, id])
  useEffect(() => {
    fetchPost()
  })
  return post
}