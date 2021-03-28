import { Header, HttpMethod } from "abc/constants.ts";
import { cors } from "abc/middleware/cors.ts";
import type { CORSConfig } from "abc/middleware/cors.ts";

import type { Application } from "abc/mod.ts";

const config: CORSConfig = {
  allowOrigins: ["*"],
  allowHeaders: [Header.ContentType, Header.Cookie, Header.SetCookie, Header.Accept, Header.Origin],
  allowMethods: [HttpMethod.Get, HttpMethod.Post, HttpMethod.Delete, HttpMethod.Put],
  allowCredentials: true
}

export default (app: Application) => {
  app.use(cors(config))
}
// export default (app: Application) => { app.use(cors(config)) }