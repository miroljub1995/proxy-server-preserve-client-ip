import dbClient from './database.ts'
import { generateJwt } from './utils.ts'

export async function registerUser(email: string, password: string) {
  const db = dbClient()
  const users = db.collection('users')
  const res = await users.insertOne({ email, password })
  console.log('User register', res)
}

export async function loginUser(email: string, password: string) {
  const db = dbClient()
  const users = db.collection('users')
  const res = await users.findOne({ email, password })
  if (res) {
    return generateJwt(email)
  }
  return null
}