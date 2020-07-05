import { useHistory } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";

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