import { con } from "./database"
// import { Bson } from "mongo/mod.ts"
import { Document, Schema, Types } from "mongoose"

export interface ViewSchema extends Document<{ post_id: Types.ObjectId, country: string }> {
  count: number
}

const viewSchema = new Schema<ViewSchema>({
  _id: { type: { post_id: Schema.Types.ObjectId, country: String }, required: true },
  count: { type: Schema.Types.Number, required: true, default: 1 }
});

export default async () => {
  const client = await con
  return client.model<ViewSchema>("views", viewSchema)
}