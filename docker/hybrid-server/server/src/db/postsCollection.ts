import dbClient from "./database.ts"
import { Bson } from "mongo/mod.ts"

interface PostSchema {
  _id: Bson.ObjectID
  title: string
  text: string
  author_id: Bson.ObjectID,
  date_created: number
}

export default async () => {
  const client = await dbClient()
  return client.collection<PostSchema>("posts")
}