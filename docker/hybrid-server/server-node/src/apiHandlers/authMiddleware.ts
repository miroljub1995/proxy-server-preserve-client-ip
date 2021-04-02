import { RequestHandler } from "express"
import { Types } from "mongoose"
import userModel from "../database/userModel"
import { validateJwt } from "../jwt"

export const authMiddleware: RequestHandler<{}, {}, {}, {}, { userId: Types.ObjectId }> = async (req, res, next) => {
  var jwt = (req.cookies && req.cookies['jwt_token']) as string | undefined
  // console.log("Cookies", req.cookies)
  if (jwt) {
    try {
      const payload = await validateJwt(jwt)
      // console.log("Jwt payload", payload)
      const UserModal = await userModel()
      var user = await UserModal.findOne({ email: payload.email }).exec()
      if (user && user._id) {
        res.locals.userId = user._id
        return await next()
      }
    }
    catch (e) {
      return res.status(401).send(e)
    }
  }
  res.status(401).send()
}