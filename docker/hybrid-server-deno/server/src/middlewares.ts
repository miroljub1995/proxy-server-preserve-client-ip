import { Status } from "https://deno.land/std@0.57.0/http/mod.ts";
import { Context } from "https://deno.land/x/abc@v1.0.0-rc10/context.ts";
import { MiddlewareFunc } from "https://deno.land/x/abc@v1.0.0-rc10/types.ts";
import { validateJwt } from "./utils.ts";

export const authenticationMiddleware: MiddlewareFunc = next => {
  return async c => {
    const jwtToken = c.cookies['jwt_token']
    const jwt = await validateJwt(jwtToken)
    if (jwt && jwt.payload && jwt.payload.iss) {
      const cContext = new AuthContext(c, jwt.payload.iss)
      return next(cContext)
    }
    else {
      c.setCookie({ httpOnly: true, name: 'jwt_token', value: "", expires: new Date() })
      c.response.status = Status.Unauthorized
    }
  }
}

export class AuthContext extends Context {
  constructor(c: Context, public email: string) {
    super(c)
  }
}
