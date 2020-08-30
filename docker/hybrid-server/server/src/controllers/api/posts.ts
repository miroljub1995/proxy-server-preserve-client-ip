import { Application } from "abc/app.ts";
import { getAllPosts } from '../posts.ts'


export default function addPosts(app: Application) {
  app
    .get('/api/posts', getAllPosts)
}