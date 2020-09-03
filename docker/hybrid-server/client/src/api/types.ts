import t, { TypeOf } from 'runtime-cast'

export const PostSchema = t.object({
  _id: t.string(),
  title: t.string(),
  text: t.string(),
  author_id: t.string(),
  date_created: t.number()
})
export type Post = TypeOf<typeof PostSchema>

export const CommentSchema = t.object({
  _id: t.string(),
  text: t.string(),
  author_id: t.string(),
  post_id: t.string(),
  date_created: t.number()
})
export type Comment = TypeOf<typeof CommentSchema>