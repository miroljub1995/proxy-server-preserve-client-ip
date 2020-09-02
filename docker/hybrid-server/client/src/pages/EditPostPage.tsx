import React, { useState, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css'
import PostEditor from '../components/Post/PostEditor'
import { usePost } from '../api/postsHooks'
import { RouteComponentProps } from 'react-router-dom'
import { Col, Button } from 'react-bootstrap'

export default ({ match }: RouteComponentProps<{ id: string }>) => {
  const post = usePost(match.params.id)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setText(post.text)
    }
  }, [post, setTitle, setText])

  return (
    <Col>
      <PostEditor titleState={[title, setTitle]} textState={[text, setText]} />
      <div className="d-flex justify-content-center mt-3">
        <Button>Save</Button>
      </div>
    </Col>
  )
}