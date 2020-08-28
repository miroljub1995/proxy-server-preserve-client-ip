import { Application } from 'abc/mod.ts'
import addStatic from './controllers/static.ts'
import addApi from './controllers/api.ts'
import addCors from './controllers/cors.ts'


export default class App {
  private readonly app: Application
  private readonly port = 8080
  constructor() {
    this.app = new Application()
    addCors(this.app)
    addStatic(this.app)
    addApi(this.app)
  }

  start() {
    this.app.start({ port: this.port })
    console.log('Server listening on port:', this.port)
  }
}