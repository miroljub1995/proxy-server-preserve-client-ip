import { RequestHandler } from "express"
import { Types } from 'mongoose'
import commentModel from "../database/commentModel"

export const getCommentByPostId: RequestHandler<{ id: string }, {}, {}> = async (req, res) => {
  var post_id = Types.ObjectId(req.params.id)

  const CommentModel = await commentModel()
  const comments = await CommentModel.find({ post_id }).exec()
  res.json(comments)
}

export const addComment: RequestHandler<{}, {}, { text: string, post_id: string }, { userId: Types.ObjectId }> = async (req, res) => {
  const CommentModel = await commentModel()

  const newComment = new CommentModel()

  newComment.text = req.body.text
  newComment.post_id = Types.ObjectId(req.body.post_id)
  newComment.author_id = res.locals.userId
  newComment.date_created = new Date().getTime()

  const comment = await newComment.save()
  res.json(comment)
}