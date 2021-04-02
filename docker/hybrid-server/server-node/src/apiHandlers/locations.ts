import { RequestHandler } from "express"
import { getLocation } from '../location'

export const getCurrentLocation: RequestHandler = async (req, res, next) => {
  try {
    const location = await getLocation(req.ip)
    if (location !== null) {
      res.json({ location: `${location.city}, ${location.country}` })
    }
    else {
      res.status(404).send()
    }
  }
  catch (e) {
    next(e)
  }
}