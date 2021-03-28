import dbClient from "./database.ts"

interface PostSchema {
  _id: { $oid: string }
  title: string
  text: string
  author_id: { $oid: string },
  date_created: number
}

export default () => {
  return dbClient().collection<PostSchema>("posts")
}