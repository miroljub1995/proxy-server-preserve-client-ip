import React, { Dispatch, SetStateAction } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

type Props = {
  textState: [string, Dispatch<SetStateAction<string>>],
  titleState: [string, Dispatch<SetStateAction<string>>]
}

export default function EditPost({ titleState: [title, setTitle], textState: [text, setText] }: Props) {
  return (
    <Col>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Group>
      </Form>
      <ReactQuill value={text} onChange={e => setText(e)} />
      <div className="d-flex justify-content-center mt-3">
        <Button>Publish</Button>
      </div>
    </Col>
  )
}