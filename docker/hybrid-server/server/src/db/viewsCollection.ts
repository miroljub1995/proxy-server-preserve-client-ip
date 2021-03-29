import dbClient from "./database.ts"
import { Bson } from "mongo/mod.ts"

interface ViewSchema {
  _id: { post_id: Bson.ObjectID, country: string }
  count: number
}

export default async () => {
  const client = await dbClient()
  return client.collection<ViewSchema>("views")
}