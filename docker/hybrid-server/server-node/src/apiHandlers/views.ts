import { RequestHandler } from "express"
import { Types } from "mongoose"
import viewModel from "../database/viewModel"

export const getViewByPostId: RequestHandler<{ id: string }, {}, {}, { userId: Types.ObjectId }> = async (req, res, next) => {
  try {
    const postId = Types.ObjectId(req.params.id)

    const ViewModel = await viewModel()
    const views = await ViewModel.find({ "_id.post_id": postId }).exec()
    res.json(views.map(v => ({ _id: v._id?.country, value: v.count })))
  }
  catch (e) {
    next(e)
  }
}