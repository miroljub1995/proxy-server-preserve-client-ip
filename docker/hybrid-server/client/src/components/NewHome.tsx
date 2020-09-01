import React from "react"
import { Col, Row } from "react-bootstrap"
import { useWhatsNew } from "../api/postsHooks"
import PostList from "./PostList"
import VerticalLine from './VerticalLine'


export default () => {
  const whatsNewPosts = useWhatsNew()
  return (
    <Row className="mt-4">
      <Col sm="6">
        <PostList posts={whatsNewPosts} title="What's NEW" />
      </Col>
      <VerticalLine />
      <Col sm="6">
        <PostList posts={whatsNewPosts} title="What's HOT" />
      </Col>
    </Row>
  )
}