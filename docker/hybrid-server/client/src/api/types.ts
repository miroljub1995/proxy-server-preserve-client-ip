import t, { TypeOf } from 'runtime-cast'

export const PostSchema = t.object({
  _id: t.string(),
  title: t.string(),
  text: t.string(),
  author_id: t.string()
})

export type Post = TypeOf<typeof PostSchema>