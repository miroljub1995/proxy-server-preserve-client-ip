import { Application } from "abc/app.ts";
import addUserApi from './api/user.ts'
import addLocationApi from "./api/location.ts";
import addTest from './api/test.ts'

export default function addApi(app: Application) {
  // const apiGroup = app.group('/api')
  addUserApi(app)
  addLocationApi(app)
  addTest(app)
}