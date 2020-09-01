import { Application } from "abc/app.ts";
import { getByPostId } from '../comments.ts';


export default function addCommentsApi(app: Application) {
  app
    .get('/api/comments/by/post/:id', getByPostId)
}