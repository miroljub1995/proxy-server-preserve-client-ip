import dbClient from "./database.ts"

interface ViewSchema {
  _id: { post_id: { $oid: string }, country: string }
  count: number
}

export default () => {
  return dbClient().collection<ViewSchema>("views")
}