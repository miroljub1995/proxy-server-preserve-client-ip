const POSTS_API_URL = new URL('api/posts', process.env.REACT_APP_API_ENDPOINT)
const COMMENTS_API_URL = new URL('api/comments', process.env.REACT_APP_API_ENDPOINT)

export const ApiEndpoints = {
  posts_whatsNew: `${POSTS_API_URL.href}/whats-new`,
  posts_whatsHot: `${POSTS_API_URL.href}/whats-hot`,
  posts: (id: string) => `${POSTS_API_URL.href}/${id}`,

  comments_by_post_id: (id: string) => `${COMMENTS_API_URL.href}/by/post/${id}`
}