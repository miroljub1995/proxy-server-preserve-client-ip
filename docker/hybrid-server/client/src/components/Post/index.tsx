import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router-dom'
import { usePost } from '../../api/postsHooks'

export default ({ match }: RouteComponentProps<{ id: string }>) => {
  const post = usePost(match.params.id)
  if (post === null)
    return <></>
  return (
    <ListGroup key={post._id}>
      <ListGroup.Item>
        <h5>{post.title}</h5>
        <p>{post.text}</p>
      </ListGroup.Item>
    </ListGroup>
  )
}