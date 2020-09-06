import { useState, useCallback, useEffect } from "react"
import { View, ViewSchema } from "./types"
import { ApiEndpoints } from "./endpoints"
import t from 'runtime-cast'


export const useViewsByPostId = (id: string) => {
  const [views, setViews] = useState<View[]>([])
  const fetchViews = useCallback(async () => {
    const res = await fetch(ApiEndpoints.views_by_post_id(id), {
      credentials: 'include'
    })
    const responseJson = await res.json()
    const data = t.array(ViewSchema).cast(responseJson)
    setViews(data)
  }, [id, setViews])
  useEffect(() => {
    fetchViews()
  }, [fetchViews])
  return views
}