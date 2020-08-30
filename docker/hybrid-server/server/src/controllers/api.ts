import { Application } from "abc/app.ts";
import addUsersApi from './api/users.ts'
import addLocationApi from "./api/location.ts";
import addTest from './api/test.ts'
import addPostsApi from './api/posts.ts'

export default function addApi(app: Application) {
  // const apiGroup = app.group('/api')
  addUsersApi(app)
  addLocationApi(app)
  addTest(app)
  addPostsApi(app)
}