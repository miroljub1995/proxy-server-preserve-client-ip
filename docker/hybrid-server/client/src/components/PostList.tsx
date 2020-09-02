import React from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import { Post } from '../api/types'
import "./PostList.scss"
import { Link } from 'react-router-dom'

export default ({ posts, title }: { posts: Post[], title: string }) => (
  <Row>
    <Col className="justify-content-center">
      <h5 className="mb-4 text-center">{title}</h5>
      {posts.map(e => (
        <ListGroup className="my-3">
          <Link to={`posts/${e._id}`} key={e._id} className="link">
            <ListGroup.Item>
              <h5>{e.title}</h5>
              <p className="post-text">{e.text}</p>
            </ListGroup.Item>
          </Link>
        </ListGroup>
      ))}
    </Col>
  </Row>
)