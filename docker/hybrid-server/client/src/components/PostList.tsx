import React from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import { Post } from '../api/types'
import "./PostList.scss"
import { Link } from 'react-router-dom'
import PostText from './PostText'

export default ({ posts, title }: { posts: Post[], title?: string }) => (
  <Row>
    <Col className="justify-content-center">
      {title && <h5 className="mb-4 text-center">{title}</h5>}
      {posts.map(e => (
        <ListGroup key={e._id} className="my-3">
          <Link to={`/posts/${e._id}`} className="link">
            <ListGroup.Item>
              <h5>{e.title}</h5>
              <PostText text={e.text} className="post-text" />
            </ListGroup.Item>
          </Link>
        </ListGroup>
      ))}
    </Col>
  </Row>
)