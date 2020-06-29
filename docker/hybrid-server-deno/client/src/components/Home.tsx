import React from 'react'
import { Button } from 'react-bootstrap'
import './Home.css'

function Home() {
  const location = "Nis, RS"
  return (
    <div className="home-container">
      <h5>Your current location based on your IP</h5>
      <iframe
        className="gmap"
        title="Current location"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDRlAl7Ob0YjhoU2qgPzXGnEOmFd2UNCsw&q=${location}`}>
      </iframe>
      <Button type="button">Save current location</Button>
      <p>Backend: {process.env.REACT_APP_API_ENDPOINT}</p>
    </div>
  )
}

export default Home