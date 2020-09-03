import { Application } from "abc/app.ts";
import { getAllPosts, getWhatsHotPosts, getWhatsNewPosts, getPost, addPost, editPost, deletePost, getPostsByMe } from '../posts.ts';
import { authenticationMiddleware } from "../../middlewares.ts";


export default function addPosts(app: Application) {
  app
    .get('/api/posts', getAllPosts)
    .get('/api/posts/by/whats-new', getWhatsNewPosts)
    .get('/api/posts/by/whats-hot', getWhatsHotPosts)
    .get('/api/posts/by/id/:id', getPost)
    .get('/api/posts/by/me', getPostsByMe, authenticationMiddleware)

    .post('/api/posts', addPost, authenticationMiddleware)

    .put('/api/posts/by/id/:id', editPost, authenticationMiddleware)

    .delete('/api/posts/by/id/:id', deletePost, authenticationMiddleware)
}