import React from 'react'
import {
  Form,
  Button,
  Col
} from 'react-bootstrap'

function Login() {
  return (
    <Form>
      <Form.Group className="col-4">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="col-4">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Col className="col">
        <Button variant="primary" type="button">Login</Button>
      </Col>
    </Form>
  )
}

export default Login