import { Header, HttpMethod } from "abc/constants.ts";
import { cors } from "abc/middleware/cors.ts";
import type { CORSConfig } from "abc/middleware/cors.ts";

import type { Application } from "abc/mod.ts";

const allowedOrigins = [
  "http://192.168.0.200:8083",
  "http://192.168.0.200:8084",
  "https://192.168.0.200:8184",
  "http://dunja-home.ddns.net:8083",
  "http://dunja-home.ddns.net:8084",
  "https://dunja-home.ddns.net:8184",
  "http://localhost:3000",
  "http://192.168.0.107:3000"
]

const config: CORSConfig = {
  allowOrigins: allowedOrigins,
  allowHeaders: [Header.ContentType, Header.Accept, Header.Origin],
  allowMethods: [HttpMethod.Get, HttpMethod.Post, HttpMethod.Delete, HttpMethod.Put],
  allowCredentials: true
}

export default (app: Application) => {
  app.use(cors(config))
}
// export default (app: Application) => { app.use(cors(config)) }