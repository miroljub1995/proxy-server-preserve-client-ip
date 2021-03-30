import { Context } from "abc/context.ts";
import { NotFoundException, UnauthorizedException } from "abc/mod.ts";
import type { HandlerFunc, MiddlewareFunc } from "abc/types.ts";
import { validateJwt } from "./utils.ts";

export const authenticationMiddleware: MiddlewareFunc = next => {
  return async c => {
    const jwtToken = c.cookies['jwt_token']
    console.log("Checking auth, token:", jwtToken)
    try {
      const payload = await validateJwt(jwtToken)
      if (!payload.iss) {
        throw new Error("Issuer not defined in token");
      }
      console.log("Jwt valid")
      const cContext = new AuthContext(c, payload.iss)
      return next(cContext)
    }
    catch (e) {
      console.log("Jwt not valid", e)
      c.setCookie({ httpOnly: true, name: 'jwt_token', value: "", expires: new Date(), secure: false })
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
