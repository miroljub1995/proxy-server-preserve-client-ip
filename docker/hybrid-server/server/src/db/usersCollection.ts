import dbClient from "./database.ts"
import { Bson } from 'mongo/mod.ts'

interface UserSchema {
  _id: Bson.ObjectID
  email: string
  password: string
  locations: { location: string, description: string }[] | null
}

export default async () => {
  const client = await dbClient()
  return client.collection<UserSchema>("users")
}