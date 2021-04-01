import { RequestHandler } from "express"
import { getLocation } from '../location'

export const getCurrentLocation: RequestHandler = async (req, res) => {
  const location = await getLocation(req.ip)
  if (location !== null) {
    res.json({ location: `${location.city}, ${location.country}` })
  }
  else {
    res.status(404).send()
  }
}