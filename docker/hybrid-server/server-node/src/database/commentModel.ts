import dbClient from "./database"
import { ObjectId, Schema, Types } from "mongoose";
import { Document } from "mongoose";

export interface Comment extends Document<Types.ObjectId> {
  text: string
  author_id: Types.ObjectId
  parent_id: Types.ObjectId | null
  post_id: Types.ObjectId
  date_created: number
}

const commentSchema = new Schema<Comment>({
  text: { type: String, required: true },
  author_id: { type: Schema.Types.ObjectId, required: true },
  parent_id: { type: Schema.Types.ObjectId },
  post_id: { type: Schema.Types.ObjectId, required: true },
  date_created: { type: Number, required: true }
});

export default async () => {
  const client = await dbClient()
  return client.model<Comment>("comments", commentSchema)
}