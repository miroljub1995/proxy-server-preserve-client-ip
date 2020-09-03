const POSTS_API_URL = new URL('api/posts', process.env.REACT_APP_API_ENDPOINT)
const COMMENTS_API_URL = new URL('api/comments', process.env.REACT_APP_API_ENDPOINT)

export const ApiEndpoints = {
  posts_whatsNew: `${POSTS_API_URL.href}/by/whats-new`,
  posts_whatsHot: `${POSTS_API_URL.href}/by/whats-hot`,
  posts_by_id: (id: string) => `${POSTS_API_URL.href}/by/id/${id}`,
  posts: `${POSTS_API_URL.href}`,

  comments: COMMENTS_API_URL.href,
  comments_by_post_id: (id: string) => `${COMMENTS_API_URL.href}/by/post_id/${id}`
}