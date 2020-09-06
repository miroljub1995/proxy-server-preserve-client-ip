import { HandlerFunc } from "abc/types.ts"
import dbClient from '../database.ts'

export interface ViewSchema {
  _id: { post_id: { $oid: string }, country: string }
  count: number
}

export const getViewsByPostId: HandlerFunc = async c => {
  const post_id = c.params.id
  const db = dbClient()
  const views = (await db.collection('views').find({ "_id.post_id": { $oid: post_id } }) || []) as ViewSchema[]
  c.json(views.map(v => ({ _id: v._id.country, value: v.count })))
}