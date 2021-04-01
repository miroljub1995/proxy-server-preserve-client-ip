import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const origin = [
  "http://192.168.0.200:8083",
  "http://192.168.0.200:8084",
  "https://192.168.0.200:8184",
  "http://dunja-home.ddns.net:8083",
  "http://dunja-home.ddns.net:8084",
  "https://dunja-home.ddns.net:8184",
  "http://localhost:3000",
  "http://192.168.0.107:3000"
]

const allowedHeaders = [
  "Content-Type",
  "Accept",
  "Origin"
]

const methods = [
  "Get",
  "Post",
  "Delete",
  "Put"
]

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors({
      origin,
      allowedHeaders,
      methods,
      credentials: true
    }))
    this.server.use(express.json());
    this.server.use(cookieParser());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;