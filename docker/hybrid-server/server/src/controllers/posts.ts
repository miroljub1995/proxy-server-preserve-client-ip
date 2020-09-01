import { HandlerFunc } from "abc/types.ts"
import dbClient from '../database.ts'

interface PostSchema {
  _id: { $oid: string }
  title: string
  text: string
  author_id: { $oid: string }
}

export const getAllPosts: HandlerFunc = async c => {
  const db = dbClient()
  const posts = (await db.collection('posts').find() || []) as PostSchema[]
  c.json(posts.map(e => ({ ...e, _id: e._id.$oid, author_id: e.author_id.$oid })))
}

export const getWhatsNewPosts: HandlerFunc = async c => {
  return await getAllPosts(c)
}

export const getWhatsHotPosts: HandlerFunc = async c => {
  return await getAllPosts(c)
}

export const getPost: HandlerFunc = async c => {
  const db = dbClient()
  const post = await db.collection('posts').findOne({ _id: { $oid: c.params.id } }) as PostSchema
  c.json({ ...post, _id: post._id.$oid, author_id: post.author_id.$oid })
}