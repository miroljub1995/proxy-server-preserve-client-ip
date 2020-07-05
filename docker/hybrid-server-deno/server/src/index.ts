import { Status } from "https://deno.land/std@0.57.0/http/mod.ts";
import { Header, HttpMethod } from "https://deno.land/x/abc@v1.0.0-rc10/constants.ts";
import { cors, CORSConfig } from "https://deno.land/x/abc@v1.0.0-rc10/middleware/cors.ts";
import { Application } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { getSavedLocations, loginUser, registerUser, saveCurrentLocation } from "./controllers.ts";
import { AuthContext, authenticationMiddleware } from "./middlewares.ts";
import { validateJwt } from "./utils.ts";

const app = new Application()
const config: CORSConfig = {
  allowOrigins: ["http://localhost:3000", "http://localhost:8080"],
  allowHeaders: [Header.ContentType, Header.Cookie, Header.SetCookie, Header.Accept, Header.Origin],
  allowMethods: [HttpMethod.Get, HttpMethod.Post, HttpMethod.Delete, HttpMethod.Put],
  allowCredentials: true
};
app.use(cors(config));

app
  .static("/", "../client/")
  .post('/register', async c => {
    const body = await c.body() as { email: string, password: string }
    const { email, password } = body
    registerUser(email, password)
    c.response.status = Status.OK
  })
  .post('/login', async (c) => {
    const { email, password } = await c.body() as { email: string, password: string }
    const loginStatus = await loginUser(email, password)
    if (loginStatus) {
      const [jwtToken, exp] = loginStatus
      c.setCookie({ httpOnly: true, name: 'jwt_token', value: jwtToken, expires: new Date(exp) })
      c.json({ email })
    }
    else {
      c.response.status = Status.Unauthorized
    }
  })
  .post('/logout', c => {
    c.setCookie({ httpOnly: true, name: 'jwt_token', value: "", expires: new Date() })
    c.response.status = Status.OK
  })
  .get('/check-login', async c => {
    const email = (c.customContext as AuthContext).email
    c.json({ email })
  }, authenticationMiddleware)
  .get('/get-current-location', c => {
    const clientAddress = c.request.conn.remoteAddr
    if (clientAddress.transport === 'tcp') {
      console.log('Client ip:', clientAddress.hostname)
    }
    const location = 'Nis, Serbia'
    c.json({ location })
  }, authenticationMiddleware)
  .post('/save-current-location', async c => {
    const { description } = await c.body() as { description: string }
    const email = (c.customContext as AuthContext).email
    const location = 'Nis, Serbia'
    const res = await saveCurrentLocation(email, location, description)
    if (res)
      c.response.status = Status.OK
    else
      c.response.status = Status.InternalServerError
  }, authenticationMiddleware)
  .get('/saved-locations', async c => {
    const email = (c.customContext as AuthContext).email
    const locations = await getSavedLocations(email)
    c.json({ locations })
  }, authenticationMiddleware)
  .start({ port: 8080 })
console.log('Server listening on port:', 8080)