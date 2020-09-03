import { HandlerFunc } from "abc/types.ts"
import dbClient from '../database.ts'
import { AuthContext } from "../middlewares.ts"

interface CommentSchema {
  _id: { $oid: string }
  text: string
  author_id: { $oid: string }
  parent_id: { $oid: string } | null
  post_id: { $oid: string }
}

export const getByPostId: HandlerFunc = async c => {
  const db = dbClient()
  const comments = (await db.collection('comments').find({ post_id: { $oid: c.params.id } }) || []) as CommentSchema[]
  c.json(comments.map(e => ({ ...e, _id: e._id.$oid, author_id: e.author_id.$oid, parent_id: e.parent_id && e.parent_id.$oid, post_id: e.post_id.$oid })))
}

export const addComment: HandlerFunc = async c => {
  const email = (c as AuthContext).email
  const comment = JSON.parse(await c.body())
  const db = dbClient()
  const { _id: author_id } = await db.collection('users').findOne({ email })
  await db.collection('comments').insertOne({ text: comment.text, post_id: { $oid: comment.post_id }, author_id, date_created: new Date().getTime() })
}