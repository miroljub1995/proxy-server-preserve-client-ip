import React, { useCallback, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import Authenticated from './Authenticated'

type Location = { location: string, description: string }

function Saved() {
  const [saved, setSaved] = useState<Location[]>([])
  const getSavedLocations = useCallback(async () => {
    const res = await fetch(process.env.REACT_APP_API_ENDPOINT + '/saved-locations', {
      credentials: 'include'
    })
    if (res.status === 200) {
      const { locations } = await res.json() as { locations: Location[] }
      setSaved(locations)
      console.log(locations)
    }
  }, [setSaved])
  useEffect(() => {
    getSavedLocations()
  }, [getSavedLocations])
  return (
    <Authenticated>
      <Table bordered size="sm">
        <thead>
          <tr>
            <th>Location</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {saved.map(({ location, description }, i) => (
            <tr key={i}>
              <td>{location}</td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Authenticated>
  )
}

export default Saved