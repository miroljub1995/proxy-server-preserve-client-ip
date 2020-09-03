import { HandlerFunc } from "abc/types.ts"
import dbClient from '../database.ts'
import { AuthContext } from "../middlewares.ts"

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

export const addPost: HandlerFunc = async c => {
  const post = JSON.parse(await c.body())
  const email = (c as AuthContext).email
  const db = dbClient()
  const { _id: author_id } = await db.collection('users').findOne({ email })
  await db.collection('posts').insertOne({ ...post, author_id, date_created: new Date().getTime() })
}

export const editPost: HandlerFunc = async c => {
  const _id = { $oid: c.params.id }
  const post = JSON.parse(await c.body())
  const email = (c as AuthContext).email
  const db = dbClient()
  const { _id: author_id } = await db.collection('users').findOne({ email })
  await db.collection('posts').updateOne({ _id, author_id }, { $set: { text: post.text, title: post.title } })
}

export const deletePost: HandlerFunc = async c => {
  const _id = { $oid: c.params.id }
  const email = (c as AuthContext).email
  const db = dbClient()
  const { _id: author_id } = await db.collection('users').findOne({ email })
  await db.collection('posts').deleteOne({ _id, author_id })
}