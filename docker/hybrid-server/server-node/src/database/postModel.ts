import { con } from "./database"
// import { Bson } from "mongo/mod.ts"
import { Document, Schema, Types } from "mongoose"

export interface Post extends Document<Types.ObjectId> {
  title: string
  text: string
  author_id: Types.ObjectId,
  date_created: number
}

const postSchema = new Schema<Post>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  author_id: { type: Schema.Types.ObjectId, required: true },
  date_created: { type: Number, required: true }
});

export default async () => {
  const client = await con
  return client.model<Post>("posts", postSchema)
}