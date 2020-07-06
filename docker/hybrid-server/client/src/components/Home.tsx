import React from 'react'
import Authenticated from './Authenticated'
import { useLocation } from './CustomHooks'
import './Home.css'
import SaveCurrentLocation from './SaveCurrentLocation'

function Home() {
  const [currentLocation] = useLocation()
  return (
    <Authenticated>
      <div className="home-container">
        {currentLocation && (
          <>
            <h5>Your current location based on your IP</h5>
            <iframe
              className="gmap"
              title="Current location"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDRlAl7Ob0YjhoU2qgPzXGnEOmFd2UNCsw&q=${currentLocation}`}>
            </iframe>
            <SaveCurrentLocation />
          </>)}
        <p>Backend: {process.env.REACT_APP_API_ENDPOINT}</p>
      </div>
    </Authenticated>
  )
}

export default Home