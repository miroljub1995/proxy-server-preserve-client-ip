import type { HandlerFunc } from "abc/types.ts"
import viewsCollection from "../db/viewsCollection.ts"
import { Bson } from 'mongo/mod.ts'

export const getViewsByPostId: HandlerFunc = async c => {
  const post_id = new Bson.ObjectID(c.params.id)
  const viewsColl = await viewsCollection()
  const views = await viewsColl.find({ "_id.post_id": post_id }).toArray()
  c.json(views.map(v => ({ _id: v._id.country, value: v.count })))
}