import { Application } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts"
import { cors, CORSConfig } from "https://deno.land/x/abc@v1.0.0-rc10/middleware/cors.ts"
import { HttpMethod, Header } from "https://deno.land/x/abc@v1.0.0-rc10/constants.ts"
import { registerUser, loginUser } from "./controllers.ts";
// import { setCookie, getCookies } from "https://deno.land/std@0.54.0/http/cookie.ts";
import { validateJwt } from "./utils.ts";
import { convertBase64urlToUint8Array } from 'https://deno.land/x/djwt@v0.9.0/base64/base64url.ts'
import { encodeToString as convertUint8ArrayToHex } from 'https://deno.land/std/encoding/hex.ts'

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
  .get("/my-location", c => {
    return "Nis, Serbia"
  })
  .post('/register', async c => {
    const body = await c.body() as { email: string, password: string }
    const { email, password } = body
    registerUser(email, password)
    c.response.status = 200
  })
  .post('/login', async (c) => {
    const { email, password } = await c.body() as { email: string, password: string }
    const loginStatus = await loginUser(email, password)
    if (loginStatus) {
      const [jwtToken, exp] = loginStatus
      c.setCookie({ httpOnly: true, name: 'jwt_token', value: jwtToken, expires: new Date(exp) })
      c.response.body = JSON.stringify({ email })
      c.response.status = 200
    }
    else {
      c.response.status = 401
    }
  })
  .post('/logout', c => {
    c.setCookie({ httpOnly: true, name: 'jwt_token', value: "", expires: new Date() })
    c.response.status = 200
  })
  .get('/check-login', async c => {
    const jwtToken = c.cookies['jwt_token']
    if (jwtToken) {
      const jwt = await validateJwt(jwtToken)
      if (jwt && jwt.payload && jwt.payload.iss) {
        c.response.body = JSON.stringify({ email: jwt.payload.iss })
        c.response.status = 200
        return
      }
    }
    c.response.status = 401
  })
  .start({ port: 8080 })
console.log('Server listening on port:', 8080)