import dbClient from "./database.ts"
import { Bson } from "mongo/mod.ts"

interface CommentSchema {
  _id: Bson.ObjectID
  text: string
  author_id: Bson.ObjectID
  parent_id: Bson.ObjectID | null
  post_id: Bson.ObjectID
  date_created: number
}

export default async () => {
  const client = await dbClient()
  return client.collection<CommentSchema>("comments")
}