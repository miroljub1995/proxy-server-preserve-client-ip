import type { Application } from "abc/app.ts";
import { UnauthorizedException } from "abc/mod.ts";
import { Status } from "std/http/http_status.ts";
import { loginUser, registerUser } from "../../controllers.ts";
import { authenticationMiddleware } from "../../middlewares.ts";
import type { AuthContext } from "../../middlewares.ts";
import usersCollection from "../../db/usersCollection.ts";

export default function addUsersApi(app: Application) {
  app
    .post('/api/register', async c => {
      const body = await c.body as { email: string, password: string }
      const { email, password } = body
      registerUser(email, password)
      c.response.status = Status.OK
    })
    .post('/api/login', async (c) => {
      const { email, password } = await c.body as { email: string, password: string }
      const loginStatus = await loginUser(email, password)
      if (loginStatus) {
        const [jwtToken, exp] = loginStatus
        console.log("Setting cookie")
        c.setCookie({ httpOnly: true, name: 'jwt_token', value: jwtToken, expires: new Date(exp * 1e3), sameSite: 'None', secure: false })
        const usersColl = await usersCollection()
        const res = await usersColl.findOne({ email })
        if (res) {
          const { _id } = res
          c.json({ email, _id: _id.toHexString() })
        }
        else {
          throw new UnauthorizedException()
        }
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
      const usersColl = await usersCollection()
      const res = await usersColl.findOne({ email })
      if (res) {
        const { _id } = res
        c.json({ email, _id: _id.toHexString() })

      } else {
        c.response.status = 403
      }
    }, authenticationMiddleware)
}