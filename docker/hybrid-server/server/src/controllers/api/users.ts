import { Application } from "abc/app.ts";
import { UnauthorizedException } from "abc/mod.ts";
import { Status } from "std/http/http_status.ts";
import { loginUser, registerUser } from "../../controllers.ts";
import { AuthContext, authenticationMiddleware } from "../../middlewares.ts";

export default function addUsersApi(app: Application) {
  app
    .post('/api/register', async c => {
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
}