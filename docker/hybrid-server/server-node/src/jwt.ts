
import { jwtVerify } from 'jose/jwt/verify'
import { SignJWT } from 'jose/jwt/sign'

const key = Uint8Array.from(Buffer.from("QJvBOZDU8h6PcxFe9U/cZiYCz3Bpc1TJ3yTe7QpariQ=", 'base64'))
const iss = 'test'
const aud = 'test'
const alg = 'HS256'

export async function generateJwt(email: string): Promise<string> {
  const jwt = await new SignJWT({ email })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(iss)
    .setAudience(aud)
    .setExpirationTime('1h')
    .sign(key)

  return jwt
}

export async function validateJwt(jwt: string): Promise<typeof payload & { email: string }> {
  const { payload } = await jwtVerify(jwt, key, { audience: aud, algorithms: [alg], issuer: iss })
  return payload as typeof payload & { email: string }
}