import React from "react"
import { Col, Row } from "react-bootstrap"
import { useWhatsNew, useWhatsHot } from "../api/postsHooks"
import PostList from "../components/PostList"
import VerticalLine from '../components/VerticalLine'


export default () => {
  const whatsNewPosts = useWhatsNew()
  const whatsHotPosts = useWhatsHot()
  return (
    <Row className="mt-4">
      <Col sm="6">
        <PostList posts={whatsNewPosts} title="What's NEW" />
      </Col>
      <VerticalLine />
      <Col sm="6">
        <PostList posts={whatsHotPosts} title="What's HOT" />
      </Col>
    </Row>
  )
}