import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function onLogin({ email, password }: { email: string, password: string }) {
    console.log('logging in', email, password)
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
      <Col>
        Do not have account? {<Link to="/register">Register now</Link>}
      </Col>
      <Col className="col">
        <Button variant="primary" type="button" onClick={() => onLogin({ email, password })}>Login</Button>
      </Col>
    </Form>
  )
}

export default Login