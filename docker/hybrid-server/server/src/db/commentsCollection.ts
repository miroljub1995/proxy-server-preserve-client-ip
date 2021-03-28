import dbClient from "./database.ts"

interface CommentSchema {
  _id: { $oid: string }
  text: string
  author_id: { $oid: string }
  parent_id: { $oid: string } | null
  post_id: { $oid: string }
  date_created: number
}

export default () => {
  return dbClient().collection<CommentSchema>("comments")
}