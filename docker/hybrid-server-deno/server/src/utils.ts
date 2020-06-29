import { validateJwt as validateJwtCore } from 'https://deno.land/x/djwt@v0.9.0/validate.ts'
import { makeJwt, setExpiration, Jose, Payload } from 'https://deno.land/x/djwt@v0.9.0/create.ts'

// TODO: load key from env
const key = "this-is-my-secret"
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}

export function generateJwt(email: string) {
  const exp = setExpiration(new Date().getTime() + 3600e3)
  const payload: Payload = {
    iss: email,
    exp
  }
  return [makeJwt({ header, payload, key }), exp] as const
}

export async function validateJwt(jwt: string) {
  return validateJwtCore(jwt, key, { isThrowing: false })
}