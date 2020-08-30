import dbClient from '../database.ts'
import { HandlerFunc } from "abc/types.ts"

interface PostSchema {
  _id: { $oid: string };
  username: string;
  password: string;
}

export const getAllPosts: HandlerFunc = async c => {
  const db = dbClient()
  const posts = (await db.collection('posts').find() || []) as PostSchema[]
  c.json(posts)
}