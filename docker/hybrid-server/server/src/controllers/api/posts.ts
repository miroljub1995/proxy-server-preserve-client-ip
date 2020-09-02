import { Application } from "abc/app.ts";
import { getAllPosts, getWhatsHotPosts, getWhatsNewPosts, getPost } from '../posts.ts';


export default function addPosts(app: Application) {
  app
    .get('/api/posts', getAllPosts)
    .get('/api/posts/by/whats-new', getWhatsNewPosts)
    .get('/api/posts/by/whats-hot', getWhatsHotPosts)
    .get('/api/posts/by/id/:id', getPost)
}