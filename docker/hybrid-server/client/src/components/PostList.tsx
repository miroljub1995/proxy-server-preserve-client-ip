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
        <Link to={`posts/${e._id}`} key={e._id} className="my-2 link">
          <ListGroup>
            <ListGroup.Item>
              <h5>{e.title}</h5>
              <p className="post-text">{e.text}</p>
            </ListGroup.Item>
          </ListGroup>
        </Link>
      ))}
    </Col>
  </Row>
)