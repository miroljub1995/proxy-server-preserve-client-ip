import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import EditPost from '../components/Post/EditPost'

export default () => {
  const titleState = useState('')
  const textState = useState('')
  return (
    <EditPost titleState={titleState} textState={textState} />
  )
}