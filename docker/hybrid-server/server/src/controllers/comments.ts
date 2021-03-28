import type { HandlerFunc } from "abc/types.ts"
import commentsCollection from "../db/commentsCollection.ts"
import usersCollection from "../db/usersCollection.ts"
import type { AuthContext } from "../middlewares.ts"

export const getByPostId: HandlerFunc = async c => {
  const comments = await commentsCollection().find({ post_id: { $oid: c.params.id } }).toArray();
  c.json(comments.map(e => ({ ...e, _id: e._id.$oid, author_id: e.author_id.$oid, parent_id: e.parent_id && e.parent_id.$oid, post_id: e.post_id.$oid })))
}

export const addComment: HandlerFunc = async c => {
  const email = (c as AuthContext).email
  const comment = JSON.parse(await c.body as string)
  const res = await usersCollection().findOne({ email })
  if (res) {
    const { _id: author_id } = res
    await commentsCollection().insertOne({ text: comment.text, post_id: { $oid: comment.post_id }, author_id, date_created: new Date().getTime() })
  }
  else {
    c.response.status = 404
  }
}