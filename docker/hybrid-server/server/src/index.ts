import { Status } from "https://deno.land/std@0.57.0/http/mod.ts";
import { Header, HttpMethod } from "https://deno.land/x/abc@v1.0.0-rc10/constants.ts";
import { cors, CORSConfig } from "https://deno.land/x/abc@v1.0.0-rc10/middleware/cors.ts";
import { Application, InternalServerErrorException, UnauthorizedException } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { getSavedLocations, loginUser, registerUser, saveCurrentLocation } from "./controllers.ts";
import { AuthContext, authenticationMiddleware, fallbackToIndexHTML } from "./middlewares.ts";
import { getCurrentLocation } from "./utils.ts";

const app = new Application()
const config: CORSConfig = {
  allowOrigins: ["*"],
  allowHeaders: [Header.ContentType, Header.Cookie, Header.SetCookie, Header.Accept, Header.Origin],
  allowMethods: [HttpMethod.Get, HttpMethod.Post, HttpMethod.Delete, HttpMethod.Put],
  allowCredentials: true
};
app.use(cors(config));
app.use(fallbackToIndexHTML)

app
  .static("/", "../client/")
  .post('api/register', async c => {
    const body = await c.body() as { email: string, password: string }
    const { email, password } = body
    registerUser(email, password)
    c.response.status = Status.OK
  })
  .post('/api/login', async (c) => {
    const { email, password } = await c.body() as { email: string, password: string }
    const loginStatus = await loginUser(email, password)
    if (loginStatus) {
      const [jwtToken, exp] = loginStatus
      c.setCookie({ httpOnly: true, name: 'jwt_token', value: jwtToken, expires: new Date(exp), sameSite: 'None', secure: false })
      c.json({ email })
    }
    else {
      throw new UnauthorizedException()
    }
  })
  .post('/api/logout', c => {
    c.setCookie({ httpOnly: true, name: 'jwt_token', value: "", expires: new Date() })
    c.response.status = Status.OK
  })
  .get('/api/check-login', async c => {
    const email = (c.customContext as AuthContext).email
    c.json({ email })
  }, authenticationMiddleware)
  .get('/api/get-current-location', async c => {
    const clientAddress = c.request.conn.remoteAddr
    if (clientAddress.transport === 'tcp') {
      console.log('Client ip:', clientAddress.hostname)
      const location = await getCurrentLocation(clientAddress)
      if (location !== null) {
        c.json({ location: `${location.city}, ${location.country}` })
        return
      }
    }
    throw new InternalServerErrorException()
  }, authenticationMiddleware)
  .post('/api/save-current-location', async c => {
    const { description } = await c.body() as { description: string }
    const email = (c.customContext as AuthContext).email
    const location = 'Nis, Serbia'
    const res = await saveCurrentLocation(email, location, description)
    if (res)
      c.response.status = Status.OK
    else
      throw new InternalServerErrorException()
  }, authenticationMiddleware)
  .get('/api/saved-locations', async c => {
    const email = (c.customContext as AuthContext).email
    const locations = await getSavedLocations(email)
    c.json({ locations })
  }, authenticationMiddleware)
  .start({ port: 8080 })
console.log('Server listening on port:', 8080)