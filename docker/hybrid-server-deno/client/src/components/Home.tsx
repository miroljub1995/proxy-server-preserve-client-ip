import React, { useCallback, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import ResizeObserver from 'resize-observer-polyfill'
import './Home.css'

function useElementSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const targetElement = useRef<HTMLElement | null>()
  const ro = useRef(new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect
    setSize({ width, height })
  }))
  const setRef = useCallback((node: HTMLElement | null) => {
    const prev = targetElement.current
    if (prev)
      ro.current.unobserve(prev)
    targetElement.current = node
    if (node)
      ro.current.observe(node)

  }, [targetElement])
  return [setRef, size] as const
}

function Home() {
  const location = "Nis, RS"
  const [setRef, containerSize] = useElementSize()
  const mapWidth = containerSize.width

  return (
    <div className="home-container" ref={setRef}>
      <h5>Your current location based on your IP</h5>
      <iframe
        className="gmap"
        width={mapWidth}
        // width="100%"
        height="600"
        title="Current location"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDRlAl7Ob0YjhoU2qgPzXGnEOmFd2UNCsw&q=${location}`}>
      </iframe>
      <Button type="button">Save current location</Button>
    </div>
  )
}

export default Home