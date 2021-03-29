import type { HandlerFunc } from "abc/types.ts"
import commentsCollection from "../db/commentsCollection.ts"
import usersCollection from "../db/usersCollection.ts"
import type { AuthContext } from "../middlewares.ts"
import { Bson } from 'mongo/mod.ts'

export const getByPostId: HandlerFunc = async c => {
  const coll = await commentsCollection()
  const comments = await coll.find({ post_id: new Bson.ObjectID(c.params.id) }).toArray();
  c.json(comments.map(e => ({ ...e, _id: e._id.toHexString(), author_id: e.author_id.toHexString(), parent_id: e.parent_id && e.parent_id.toHexString(), post_id: e.post_id.toHexString() })))
}

export const addComment: HandlerFunc = async c => {
  const email = (c as AuthContext).email
  const comment = JSON.parse(await c.body as string)
  const usersColl = await usersCollection()
  const res = await usersColl.findOne({ email })
  if (res) {
    const { _id: author_id } = res
    const commentsColl = await commentsCollection()
    await commentsColl.insertOne({ text: comment.text, post_id: new Bson.ObjectId(comment.post_id), author_id, date_created: new Date().getTime() })
  }
  else {
    c.response.status = 404
  }
}