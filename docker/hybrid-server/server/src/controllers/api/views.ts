import { Application } from "abc/app.ts";
import { getViewsByPostId } from '../views.ts';
import { authenticationMiddleware } from "../../middlewares.ts";


export default function addViewsApi(app: Application) {
  app
    .get('/api/views/by/post/id/:id', getViewsByPostId, authenticationMiddleware)
}