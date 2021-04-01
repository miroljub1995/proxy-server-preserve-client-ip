import { Document, Schema, Types } from "mongoose"
import dbClient from "./database"
// import { Bson } from 'mongo/mod.ts'

export interface User extends Document<Types.ObjectId> {
  email: string
  password: string
  locations: { location: string, description: string }[] | null
}

const userSchema = new Schema<User>({
  id: Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default async () => {
  const client = await dbClient()
  return client.model<User>("users", userSchema)
}