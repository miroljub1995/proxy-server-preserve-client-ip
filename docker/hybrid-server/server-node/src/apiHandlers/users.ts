import { RequestHandler } from "express";
import { generateJwt } from "../jwt";
import userModel from '../database/userModel'

export const registerUser: RequestHandler<{}, {}, { email: string, password: string }> = async (req, res) => {
  const { email, password, } = req.body
  console.log("registering...", email, password)
  const UserModel = await userModel()

  const newUser = new UserModel()
  newUser.email = email
  newUser.password = password

  await newUser.save()
  return res.status(200).send()
}

export const loginUser: RequestHandler<{}, {}, { email: string, password: string }> = async (req, res) => {
  const { email, password, } = req.body
  const UserModel = await userModel()

  var user = await UserModel.findOne({ email, password }).exec()
  if (user) {
    const jwt = await generateJwt(email)
    res.cookie("jwt_token", jwt, { maxAge: 2147483647000, httpOnly: true, secure: false })
    return res.json(user)
  }
  return res.status(404).send("Email or password does not match")
}

export const logoutUser: RequestHandler = async (req, res) => {
  res.cookie('jwt_token', "", { maxAge: 0, httpOnly: true, secure: false })
  return res.status(200).send()
}