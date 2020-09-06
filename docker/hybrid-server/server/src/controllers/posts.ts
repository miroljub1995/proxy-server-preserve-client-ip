import { HandlerFunc } from "abc/types.ts"
import dbClient from '../database.ts'
import type { AuthContext } from "../middlewares.ts"
import type { ViewSchema } from './views.ts'
import { getCurrentLocation } from "../utils.ts"

interface PostSchema {
  _id: { $oid: string }
  title: string
  text: string
  author_id: { $oid: string },
  date_created: number
}

export const getWhatsNewPosts: HandlerFunc = async c => {
  const db = dbClient()
  const posts = (await db.collection('posts').find() || []) as PostSchema[]
  c.json(posts.sort((a, b) => b.date_created - a.date_created).slice(0, 10).map(e => ({ ...e, _id: e._id.$oid, author_id: e.author_id.$oid })))
}

export const getWhatsHotPosts: HandlerFunc = async c => {
  const db = dbClient()
  const views = (await db.collection('views').find() || []) as ViewSchema[]
  const viewsByPostId = new Map<string, number>()
  views.forEach(v => {
    const k = v._id.post_id.$oid
    viewsByPostId.set(k, v.count + (viewsByPostId.get(k) || 0))
  })
  const topTenPosts = Array.from(viewsByPostId.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(v => v[0])
  const posts = await Promise.all(topTenPosts.map(async post_id => {
    const post = (await db.collection('posts').findOne({ _id: { $oid: post_id } })) as PostSchema
    return { ...post, _id: post._id.$oid, author_id: post.author_id.$oid }
  }))
  c.json(posts)
}

export const getPost: HandlerFunc = async c => {
  const db = dbClient()
  const post = await db.collection('posts').findOne({ _id: { $oid: c.params.id } }) as PostSchema
  if (c.request.conn.remoteAddr.transport === 'tcp') {
    const res = await getCurrentLocation(c.request.conn.remoteAddr)
    if (res) {
      const db = dbClient()
      const viewId = { post_id: post._id, country: res.country }
      const view = await db.collection('views').findOne({ _id: viewId })
      if (view) {
        await db.collection('views').updateOne({ _id: viewId }, { $inc: { count: 1 } })
      }
      else {
        await db.collection('views').insertOne({ _id: viewId, count: 1 })
      }
    }
  }
  c.json({ ...post, _id: post._id.$oid, author_id: post.author_id.$oid })
}

export const getPostsByMe: HandlerFunc = async c => {
  const email = (c as AuthContext).email
  const db = dbClient()
  const { _id: author_id } = await db.collection('users').findOne({ email })
  const posts = (await db.collection('posts').find({ author_id: author_id }) || []) as PostSchema[]
  c.json(posts.map(post => ({ ...post, _id: post._id.$oid, author_id: post.author_id.$oid })))
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
  await db.collection('views').deleteMany({ "_id.post_id": _id })
}