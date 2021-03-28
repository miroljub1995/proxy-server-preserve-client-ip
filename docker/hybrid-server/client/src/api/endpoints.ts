const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
const POSTS_API_URL = `${API_ENDPOINT}/posts`
const COMMENTS_API_URL = `${API_ENDPOINT}/comments`
const VIEWS_API_URL = `${API_ENDPOINT}/views`

export const ApiEndpoints = {
  posts_whatsNew: `${POSTS_API_URL}/by/whats-new`,
  posts_whatsHot: `${POSTS_API_URL}/by/whats-hot`,
  posts_by_id: (id: string) => `${POSTS_API_URL}/by/id/${id}`,
  posts_by_me: `${POSTS_API_URL}/by/me`,
  posts: `${POSTS_API_URL}`,

  comments: COMMENTS_API_URL,
  comments_by_post_id: (id: string) => `${COMMENTS_API_URL}/by/post_id/${id}`,

  views_by_post_id: (id: string) => `${VIEWS_API_URL}/by/post/id/${id}`,

  check_login: `${API_ENDPOINT}/check-login`,
  login: `${API_ENDPOINT}/login`,
  logout: `${API_ENDPOINT}/logout`,
  regiser: `${API_ENDPOINT}/register`,
}
