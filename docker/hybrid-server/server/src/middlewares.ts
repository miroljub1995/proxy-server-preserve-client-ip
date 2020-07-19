import { Context } from "https://deno.land/x/abc@v1.0.0-rc10/context.ts";
import { NotFoundException, UnauthorizedException } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";
import { HandlerFunc, MiddlewareFunc } from "https://deno.land/x/abc@v1.0.0-rc10/types.ts";
import { validateJwt } from "./utils.ts";

export const authenticationMiddleware: MiddlewareFunc = next => {
  return async c => {
    const jwtToken = c.cookies['jwt_token']
    console.log("Checking auth, token:", jwtToken)
    const jwt = await validateJwt(jwtToken)
    if (jwt && jwt.payload && jwt.payload.iss) {
      console.log("Jwt valid")
      const cContext = new AuthContext(c, jwt.payload.iss)
      return next(cContext)
    }
    else {
      console.log("Jwt not valid")
      c.setCookie({ httpOnly: true, name: 'jwt_token', value: "", expires: new Date(), sameSite: 'None', secure: true })
      throw new UnauthorizedException()
    }
  }
}

export class AuthContext extends Context {
  constructor(c: Context, public email: string) {
    super(c)
  }
}

export function fallbackToIndexHTML(next: HandlerFunc) {
  return async (c: Context) => {
    try {
      return await Promise.resolve(next(c))
    }
    catch (e) {
      if (e instanceof NotFoundException && !c.url.pathname.startsWith('/api')) {
        return c.file('../client/index.html')
      }
      throw e
    }
  }
}
