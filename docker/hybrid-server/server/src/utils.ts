import { Status } from "std/http/mod.ts"
import { create, getNumericDate, Header, verify } from 'djwt/mod.ts'
import type { Payload } from 'djwt/mod.ts'

// TODO: load key from env
const key = "this-is-my-secret"
const header: Header = {
  alg: "HS256",
  typ: "JWT",
}

export async function generateJwt(email: string) {
  const exp = getNumericDate(3600)
  const payload: Payload = {
    iss: email,
    exp
  }
  return [await create(header, payload, key), exp] as const
}

export async function validateJwt(jwt: string) {
  const payload = await verify(jwt, key, header.alg)
  return payload
}

export async function getCurrentLocation(addr: Deno.NetAddr) {
  function isPrivateIP(ip: string) {
    return /(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/.test(ip)
  }
  function createURL(ip: string) {
    const fieldsParam = 'fields=status,message,country,city'
    if (isPrivateIP(ip))
      return `http://ip-api.com/json?${fieldsParam}`
    return `http://ip-api.com/json/${ip}?${fieldsParam}`
  }
  const res = await fetch(createURL(addr.hostname))
  if (res.status === Status.OK) {
    const { country, city } = await res.json() as { country: string, city: string }
    return { country, city }
  }
  return null
}