import usersCollection from "./db/usersCollection.ts"
import { generateJwt } from './utils.ts'

export async function registerUser(email: string, password: string) {
  const users = await usersCollection()
  return await users.insertOne({ email, password })
}

export async function loginUser(email: string, password: string) {
  const users = await usersCollection()
  const res = await users.findOne({ email, password })
  if (res) {
    return await generateJwt(email)
  }
  return null
}

export async function saveCurrentLocation(email: string, location: string, description: string) {
  const users = await usersCollection()
  return await users.updateOne({
    email
  }, {
    $push: {
      locations: { location, description }
    }
  })
}

export async function getSavedLocations(email: string) {
  const users = await usersCollection()
  const { locations } = await users.findOne({ email }) || { locations: [] }
  return locations
}