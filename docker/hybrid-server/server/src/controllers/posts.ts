import type { HandlerFunc } from "abc/types.ts"
import type { AuthContext } from "../middlewares.ts"
import { getCurrentLocation } from "../utils.ts"
import usersCollection from "../db/usersCollection.ts"
import viewsCollection from "../db/viewsCollection.ts"
import postsCollection from "../db/postsCollection.ts"

export const getWhatsNewPosts: HandlerFunc = async c => {
  const posts = await postsCollection().find().toArray()
  c.json(posts.sort((a, b) => b.date_created - a.date_created).slice(0, 10).map(e => ({ ...e, _id: e._id.$oid, author_id: e.author_id.$oid })))
}

export const getWhatsHotPosts: HandlerFunc = async c => {
  const views = await viewsCollection().find().toArray()
  const viewsByPostId = new Map<string, number>()
  views.forEach(v => {
    const k = v._id.post_id.$oid
    viewsByPostId.set(k, v.count + (viewsByPostId.get(k) || 0))
  })
  const topTenPosts = Array.from(viewsByPostId.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(v => v[0])
  const posts = await Promise.all(topTenPosts.map(async post_id => {
    const post = await postsCollection().findOne({ _id: { $oid: post_id } })
    if (post) {
      return { ...post, _id: post._id.$oid, author_id: post.author_id.$oid }
    }
    else {
      return null
    }
  }))
  c.json(posts.filter(p => p))
}

export const getPost: HandlerFunc = async c => {
  if (c.request.conn.remoteAddr.transport === 'tcp') {
    const res = await getCurrentLocation(c.request.conn.remoteAddr)
    if (res) {
      const post = await postsCollection().findOne({ _id: { $oid: c.params.id } })
      if (post) {
        const viewId = { post_id: post._id, country: res.country }
        const view = await viewsCollection().findOne({ _id: viewId })
        if (view) {
          await viewsCollection().updateOne({ _id: viewId }, { $inc: { count: 1 } })
        }
        else {
          await viewsCollection().insertOne({ _id: viewId, count: 1 })
        }
        c.json({ ...post, _id: post._id.$oid, author_id: post.author_id.$oid })
      }
      else {
        c.string("Post not found", 404)
      }
    }
  }
  c.response.status = 400
}

export const getPostsByMe: HandlerFunc = async c => {
  const email = (c as AuthContext).email
  const res = await usersCollection().findOne({ email })
  if (res) {
    const { _id: author_id } = res
    const posts = await postsCollection().find({ author_id: author_id }).toArray()
    c.json(posts.map(post => ({ ...post, _id: post._id.$oid, author_id: post.author_id.$oid })))
  }
  else {
    c.response.status = 404
  }
}

export const addPost: HandlerFunc = async c => {
  const post = JSON.parse(await c.body as string)
  const email = (c as AuthContext).email
  const res = await usersCollection().findOne({ email });
  if (res) {
    const { _id: author_id } = res
    await postsCollection().insertOne({ ...post, author_id, date_created: new Date().getTime() })
  }
  else {
    c.response.status = 404
  }
}

export const editPost: HandlerFunc = async c => {
  const _id = { $oid: c.params.id }
  const post = JSON.parse(await c.body as string)
  const email = (c as AuthContext).email
  const res = await usersCollection().findOne({ email })
  if (res) {
    const { _id: author_id } = res
    await postsCollection().updateOne({ _id, author_id }, { $set: { text: post.text, title: post.title } })
  } else {
    c.response.status = 404
  }
}

export const deletePost: HandlerFunc = async c => {
  const _id = { $oid: c.params.id }
  const email = (c as AuthContext).email
  const res = await usersCollection().findOne({ email })
  if (res) {
    const { _id: author_id } = res
    await postsCollection().deleteOne({ _id, author_id })
    await viewsCollection().deleteMany({ "_id.post_id": _id })
  }
  else {
    c.response.status = 404
  }
}