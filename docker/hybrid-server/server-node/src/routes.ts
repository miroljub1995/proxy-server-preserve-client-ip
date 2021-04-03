import { Router } from 'express';
import { loginUser, registerUser, logoutUser, checkLogin } from './apiHandlers/users';
import { addComment, getCommentByPostId } from './apiHandlers/comments';
import { addPost, deletePost, editPost, getPost, getPostsByMe, getWhatsHotPosts, getWhatsNewPosts } from './apiHandlers/posts';
import { authMiddleware } from './apiHandlers/authMiddleware'
import { getViewByPostId } from './apiHandlers/views';
import { getCurrentLocation } from './apiHandlers/locations';

const routes = Router();

// users
routes.post('/api/register', registerUser)
routes.post('/api/login', loginUser)
routes.post('/api/logout', logoutUser)
routes.get('/api/check-login', authMiddleware, checkLogin)

// // comments
routes.get('/api/comments/by/post_id/:id', getCommentByPostId)

routes.post('/api/comments/', authMiddleware, addComment)

// // location
routes.get('/api/get-current-location', getCurrentLocation)
// routes.get('/api/saved-locations', savedLocations)

// routes.post('/api/save-current-location', saveCurrentLocation)

// // posts
routes.get('/api/posts/by/whats-new', getWhatsNewPosts)
routes.get('/api/posts/by/whats-hot', getWhatsHotPosts)
routes.get('/api/posts/by/id/:id', getPost)
routes.get('/api/posts/by/me', authMiddleware, getPostsByMe)

routes.post('/api/posts', authMiddleware, addPost)

routes.put('/api/posts/by/id/:id', authMiddleware, editPost)

routes.delete('/api/posts/by/id/:id', authMiddleware, deletePost)

// // views
routes.get('/api/views/by/post/id/:id', authMiddleware, getViewByPostId)

// test
routes.get('/api/test', (req, res) => {
  return res.json({ prop: "Api works" })
})

export default routes;