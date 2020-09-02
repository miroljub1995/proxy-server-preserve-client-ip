import { Application } from "abc/app.ts";
import { getAllPosts, getWhatsHotPosts, getWhatsNewPosts, getPost, addPost } from '../posts.ts';
import { authenticationMiddleware } from "../../middlewares.ts";


export default function addPosts(app: Application) {
  app
    .get('/api/posts', getAllPosts)
    .get('/api/posts/by/whats-new', getWhatsNewPosts)
    .get('/api/posts/by/whats-hot', getWhatsHotPosts)
    .get('/api/posts/by/id/:id', getPost)

    .post('/api/posts', addPost, authenticationMiddleware)
}