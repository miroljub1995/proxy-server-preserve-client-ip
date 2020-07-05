import dbClient from './database.ts'
import { generateJwt } from './utils.ts'

export async function registerUser(email: string, password: string) {
  const db = dbClient()
  const users = db.collection('users')
  return await users.insertOne({ email, password })
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

export async function saveCurrentLocation(email: string, location: string, description: string) {
  const db = dbClient()
  const users = db.collection('users')
  return await users.updateOne({
    email
  }, {
    $push: {
      locations: { location, description }
    }
  })
}

export async function getSavedLocations(email: string) {
  const db = dbClient()
  const users = db.collection('users')
  const { locations } = await users.findOne({
    email
  }) as { locations: { location: string, description: string }[] }
  return locations || []
}