import React from 'react'
import { ListGroup } from 'react-bootstrap'

export type CommentsPropType = {
  comments: {
    _id: string,
    text: string,
    children: {
      _id: string,
      text: string
    }[]
  }[]
}

export default function Comments({ comments }: CommentsPropType) {
  return (
    <>
      {comments.map(c => (
        <ListGroup key={c._id} className="col-6">
          <ListGroup.Item className="rounded mt-2 bg-light">{c.text}</ListGroup.Item>
          {c.children.map(e => (
            <ListGroup.Item key={e._id} className="ml-3 my-2 p-2 rounded bg-light">{e.text}</ListGroup.Item>
          ))}
        </ListGroup>
      ))}
    </>
  )
}