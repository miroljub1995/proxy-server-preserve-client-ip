import React, { useState, useCallback } from 'react'
import 'react-quill/dist/quill.snow.css'
import PostEditor from '../components/Post/PostEditor'
import { Col, Button } from 'react-bootstrap'
import { ApiEndpoints } from '../api/endpoints'
import { useHistory } from 'react-router-dom'
import Authenticated from '../components/Authenticated'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const history = useHistory()

  const onPublish = useCallback(async () => {
    await fetch(ApiEndpoints.posts, {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      credentials: 'include'
    })
    history.push('/posts')
  }, [history, title, text])
  return (
    <Authenticated redirect>
      <Col>
        <PostEditor titleState={[title, setTitle]} textState={[text, setText]} />
        <div className="d-flex justify-content-center mt-3">
          <Button onClick={onPublish}>Publish</Button>
        </div>
      </Col>
    </Authenticated>
  )
}