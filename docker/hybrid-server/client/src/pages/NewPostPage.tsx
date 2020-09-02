import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import PostEditor from '../components/Post/PostEditor'
import { Col, Button } from 'react-bootstrap'

export default function NewPost() {
  const titleState = useState('')
  const textState = useState('')
  return (
    <Col>
      <PostEditor titleState={titleState} textState={textState} />
      <div className="d-flex justify-content-center mt-3">
        <Button>Publish</Button>
      </div>
    </Col>
  )
}