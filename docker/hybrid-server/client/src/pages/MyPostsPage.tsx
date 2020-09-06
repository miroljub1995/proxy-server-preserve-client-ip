import React from 'react'
import { usePostsByMe } from '../api/postsHooks'
import Authenticated from '../components/Authenticated'
import PostList from '../components/PostList'

const ValidatedMyPostsPage = () => {
  const posts = usePostsByMe()
  return (
    <PostList posts={posts} />
  )
}

export default () => {
  return (
    <Authenticated redirect>
      <ValidatedMyPostsPage />
    </Authenticated>
  )
}