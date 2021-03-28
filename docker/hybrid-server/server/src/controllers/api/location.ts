import { InternalServerErrorException } from "abc/mod.ts";
import type { Application } from "abc/mod.ts";
import { Status } from "std/http/mod.ts";
import { getSavedLocations, saveCurrentLocation } from "../../controllers.ts";
import { authenticationMiddleware } from "../../middlewares.ts";
import type { AuthContext } from "../../middlewares.ts";
import { getCurrentLocation } from "../../utils.ts";

export default function addLocationApi(app: Application) {
  app
    .get('/api/get-current-location', async c => {
      const clientAddress = c.request.conn.remoteAddr
      if (clientAddress.transport === 'tcp') {
        console.log('Client ip:', clientAddress.hostname)
        const location = await getCurrentLocation(clientAddress)
        if (location !== null) {
          c.json({ location: `${location.city}, ${location.country}` })
          return
        }
      }
      throw new InternalServerErrorException()
    }, authenticationMiddleware)
    .post('/api/save-current-location', async c => {
      const { description } = await c.body as { description: string }
      const email = (c.customContext as AuthContext).email
      const clientAddress = c.request.conn.remoteAddr
      if (clientAddress.transport !== 'tcp')
        throw new InternalServerErrorException()
      const location = await getCurrentLocation(clientAddress)
      if (!location)
        throw new InternalServerErrorException()
      const res = await saveCurrentLocation(email, `${location.city}, ${location.country}`, description)
      if (res)
        c.response.status = Status.OK
      else
        throw new InternalServerErrorException()
    }, authenticationMiddleware)
    .get('/api/saved-locations', async c => {
      const email = (c.customContext as AuthContext).email
      const locations = await getSavedLocations(email)
      c.json({ locations })
    }, authenticationMiddleware)
}