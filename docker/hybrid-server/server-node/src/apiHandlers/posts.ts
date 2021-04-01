import { RequestHandler } from "express"
import viewModel from "../database/viewModel"
import postModel from "../database/postModel"
import { Types } from "mongoose"
import { getLocation } from "../location"


export const getWhatsNewPosts: RequestHandler<{}, {}, {}, {}> = async (_, res) => {
  const PostModel = await postModel()
  const posts = await PostModel.find().exec()
  res.json(posts.sort((a, b) => b.date_created - a.date_created).slice(0, 10))
}

// const viewsColl = await viewsCollection()
//   const views = await viewsColl.find().toArray()
//   const viewsByPostId = new Map<string, number>()
//   views.forEach(v => {
//     const k = v._id.post_id.toHexString()
//     viewsByPostId.set(k, v.count + (viewsByPostId.get(k) || 0))
//   })
//   const topTenPosts = Array.from(viewsByPostId.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(v => v[0])
//   const posts = await Promise.all(topTenPosts.map(async post_id => {
//     const postsColl = await postsCollection()
//     const post = await postsColl.findOne({ _id: new Bson.ObjectID(post_id) })
//     if (post) {
//       return { ...post, _id: post._id.toHexString(), author_id: post.author_id.toHexString() }
//     }
//     else {
//       return null
//     }
//   }))
//   c.json(posts.filter(p => p))

export const getWhatsHotPosts: RequestHandler<{}, {}, {}, {}> = async (_, res) => {
  const ViewModel = await viewModel()
  const views = await ViewModel.find().exec()
  const viewsByPostId = new Map<Types.ObjectId, number>()
  views.forEach(v => {
    if (v._id) {
      const k = v._id.post_id
      viewsByPostId.set(k, v.count + (viewsByPostId.get(k) || 0))
    }
  })
  const topTenPosts = Array.from(viewsByPostId.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(v => v[0])
  const posts = await Promise.all(topTenPosts.map(async post_id => {
    const PostModel = await postModel()
    const post = await PostModel.findOne({ _id: post_id }).exec()
    return post
  }))
  res.json(posts.filter(p => p))
}

export const getPost: RequestHandler<{ id: string }, {}, {}, {}> = async (req, res) => {
  const location = await getLocation(req.ip)
  if (location) {
    const PostModel = await postModel()
    const post = await PostModel.findOne({ _id: Types.ObjectId(req.params.id) }).exec()
    if (post && post._id) {
      const viewId = { post_id: post._id, country: location.country }
      const ViewModel = await viewModel()
      const view = await ViewModel.findOne({ _id: viewId }).exec()
      await ViewModel.updateOne({ _id: viewId }, { $inc: { count: 1 } }, { writeConcern: { w: 'majority' }, upsert: true }).exec()
      res.json(post)
    }
    else {
      res.status(404).send("Post not found.")
    }
  }
  else {
    res.status(404).send("Location not found.")
  }
}

export const getPostsByMe: RequestHandler<{}, {}, {}, { userId: Types.ObjectId }> = async (req, res) => {
  const PostModel = await postModel()
  const posts = await PostModel.find({ author_id: res.locals.userId }).exec()
  res.json(posts)
}

export const addPost: RequestHandler<{}, {}, { title: string, text: string }, { userId: Types.ObjectId }> = async (req, res) => {
  const PostModel = await postModel()
  const newPost = new PostModel()
  newPost.title = req.body.title
  newPost.text = req.body.text
  newPost.author_id = res.locals.userId
  newPost.date_created = new Date().getTime()
  const svedPost = await newPost.save()
  res.json(svedPost)
}

export const editPost: RequestHandler<{ id: string }, {}, { title: string, text: string }, { userId: Types.ObjectId }> = async (req, res) => {
  const PostModel = await postModel()
  const post = await PostModel.findOne({ _id: Types.ObjectId(req.params.id) }).exec()
  if (post) {
    post.title = req.body.title
    post.text = req.body.text
    const svedPost = await post.save()
    return res.json(svedPost)
  }
  res.status(404).send()
}

export const deletePost: RequestHandler<{ id: string }, {}, {}, { userId: Types.ObjectId }> = async (req, res) => {
  const postId = Types.ObjectId(req.params.id)

  const PostModel = await postModel()
  await PostModel.deleteOne({ _id: postId })

  const ViewModel = await viewModel()
  await ViewModel.deleteMany({ "_id.post_id": postId }).exec()
  res.status(200).send()
}