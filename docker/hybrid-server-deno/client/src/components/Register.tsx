import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'

function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onRegister({ email, password }: { email: string, password: string }) {
    console.log('registering', email, password)
  }

  return (
    <Form>
      <Form.Group className="col-4">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="col-4">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Col className="col">
        <Button variant="primary" type="button" onClick={() => onRegister({ email, password })}>Register</Button>
      </Col>
    </Form>
  )
}

export default Register