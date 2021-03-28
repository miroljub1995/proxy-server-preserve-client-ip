import type { Application } from "abc/app.ts";
import { getByPostId, addComment } from '../comments.ts';
import { authenticationMiddleware } from "../../middlewares.ts";


export default function addCommentsApi(app: Application) {
  app
    .get('/api/comments/by/post_id/:id', getByPostId)

    .post('/api/comments/', addComment, authenticationMiddleware)
}