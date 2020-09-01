import React from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import { Post } from '../api/types'
import "./PostList.scss"

export default ({ posts, title }: { posts: Post[], title: string }) => (
  <Row>
    <Col className="justify-content-center">
      <h5 className="mb-4 text-center">{title}</h5>
      {posts.map(e => (
        <ListGroup key={e._id} className="my-2">
          <ListGroup.Item>
            <h5>{e.title}</h5>
            <p className="post-text">{e.text}</p>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </Col>
  </Row>
)