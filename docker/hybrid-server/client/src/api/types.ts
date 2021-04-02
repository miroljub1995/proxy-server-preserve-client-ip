import t, { TypeOf } from 'runtime-cast'

export const PostSchema = t.object({
  _id: t.string(),
  title: t.string(),
  text: t.string(),
  author_id: t.string(),
  date_created: t.number(),
  __v: t.number()
})
export type Post = TypeOf<typeof PostSchema>

export const CommentSchema = t.object({
  _id: t.string(),
  text: t.string(),
  author_id: t.string(),
  post_id: t.string(),
  date_created: t.number(),
  __v: t.number()
})
export type Comment = TypeOf<typeof CommentSchema>

export const UserSchema = t.object({
  _id: t.string(),
  email: t.string()
})
export type User = TypeOf<typeof UserSchema>

export const ViewSchema = t.object({
  _id: t.string(),
  value: t.number()
})
export type View = TypeOf<typeof ViewSchema>
