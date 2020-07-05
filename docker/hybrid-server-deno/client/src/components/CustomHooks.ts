import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export function useInput() {
  const [value, setValue] = useState('')
  function setStateFromInput(e: React.ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.value)
  }
  return [value, setStateFromInput] as const
}

export function useLocation() {
  const [currentLocation, setCurrentLocation] = useState<string | null>(null)
  const history = useHistory()
  const getCurrentLocation = useCallback(async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API_ENDPOINT + '/get-current-location', {
        credentials: 'include'
      });
      if (res.status === 200) {
        const { location } = await res.json() as { location: string }
        setCurrentLocation(location)
      }
    }
    catch (e) {
      console.error(e)
    }
  }, [setCurrentLocation])
  useEffect(() => {
    getCurrentLocation()
  }, [getCurrentLocation])

  const saveCurrentLocation = useCallback(async (description: string) => {
    try {
      const res = await fetch(process.env.REACT_APP_API_ENDPOINT + '/save-current-location', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
      })
      if (res.status === 200) {
        history.push('/saved')
      }
    }
    catch (err) {
      console.error(err)
    }
  }, [history])
  return [currentLocation, saveCurrentLocation] as const
}

export function useModal() {
  const [show, setShow] = useState(false)
  const handleHide = () => setShow(false)
  const handleShow = () => setShow(true)

  return [show, handleShow, handleHide] as const
}