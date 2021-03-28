import type { HandlerFunc } from "abc/types.ts"
import viewsCollection from "../db/viewsCollection.ts"

export interface ViewSchema {
  _id: { post_id: { $oid: string }, country: string }
  count: number
}

export const getViewsByPostId: HandlerFunc = async c => {
  const post_id = c.params.id
  const views = await viewsCollection().find({ "_id.post_id": { $oid: post_id } }).toArray()
  c.json(views.map(v => ({ _id: v._id.country, value: v.count })))
}