import { Application } from "abc/mod.ts";

export default function addTest(app: Application) {
  app.get('/api/test', c => {
    c.string('Api works')
  })
}