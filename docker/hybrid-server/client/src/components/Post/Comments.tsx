import React from 'react'
import { ListGroup, Col } from 'react-bootstrap'
import './Comments.scss'
import TextareaAutosize from 'react-textarea-autosize';
import { useEnterCallback } from '../CustomHooks';

export type CommentsPropType = {
  comments: {
    _id: string,
    text: string
  }[]
}

export default function Comments({ comments }: CommentsPropType) {
  const onEnter = useEnterCallback(() => {
    console.log('On enter')
  })
  return (
    <Col className="col-6">
      <TextareaAutosize className="write-comment p-2" placeholder="Comment" onKeyPress={onEnter} />
      {comments.map(c => (
        <ListGroup key={c._id}>
          <ListGroup.Item className="rounded mt-2 bg-light">{c.text}</ListGroup.Item>
        </ListGroup>
      ))}
    </Col>
  )
}