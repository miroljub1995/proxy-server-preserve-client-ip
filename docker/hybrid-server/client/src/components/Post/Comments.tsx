import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import './Comments.scss';

export type CommentsPropType = {
  comments: {
    _id: string,
    text: string
  }[]
}

export default function Comments({ comments }: CommentsPropType) {
  return (
    <Col className="col-6">
      {comments.map(c => (
        <ListGroup key={c._id}>
          <ListGroup.Item className="rounded mt-2 bg-light">{c.text}</ListGroup.Item>
        </ListGroup>
      ))}
    </Col>
  )
}