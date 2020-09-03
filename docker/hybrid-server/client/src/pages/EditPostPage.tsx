import React, { useState, useEffect, useCallback } from 'react'
import 'react-quill/dist/quill.snow.css'
import PostEditor from '../components/Post/PostEditor'
import { usePost } from '../api/postsHooks'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { Col, Button } from 'react-bootstrap'
import { ApiEndpoints } from '../api/endpoints'

export default ({ match }: RouteComponentProps<{ id: string }>) => {
  const post = usePost(match.params.id)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setText(post.text)
    }
  }, [post, setTitle, setText])

  const onSave = useCallback(async () => {
    if (post) {
      await fetch(ApiEndpoints.posts, {
        method: 'PUT',
        body: JSON.stringify({ _id: post._id, title, text }),
        credentials: 'include'
      })
      history.push('/posts')
    }
  }, [post, title, text, history])

  return (
    <Col>
      <PostEditor titleState={[title, setTitle]} textState={[text, setText]} />
      <div className="d-flex justify-content-center mt-3">
        <Button onClick={onSave}>Save</Button>
      </div>
    </Col>
  )
}