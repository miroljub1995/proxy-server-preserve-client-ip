const POSTS_API_URL = new URL('api/posts', process.env.REACT_APP_API_ENDPOINT)

function getFullURL(path: string) {
  return `${POSTS_API_URL.href}/${path}`
}

export const ApiEndpoints = {
  posts_whatsNew: getFullURL('whats-new'),
  posts_whatsHot: getFullURL('whats-hot'),
  posts: (id: string) => `${POSTS_API_URL}/${id}`
}