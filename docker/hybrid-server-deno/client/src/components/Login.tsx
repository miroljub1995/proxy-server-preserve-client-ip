import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { login, useUserStatus } from './UserStatus'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userStatus, changeStatus] = useUserStatus()

  function onLogin(email: string, password: string) {
    console.log('logging in', email, password)
    fetch(process.env.REACT_APP_API_ENDPOINT + "/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
      .then(async res => {
        if (res.status === 401) {
          console.log('Failed to login')
        }
        else {
          const { email } = await res.json() as { email: string }
          changeStatus(login(email))
        }
      })
  }

  if (userStatus.isAuthenticated) {
    return (
      <Redirect push to="/" />
    )
  }

  return (
    <Form>
      <Form.Group className="col-4">
        <Form.Label>Email address</Form.Label >
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group >
      <Form.Group className="col-4">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Col>
        Do not have account? {<Link to="/register">Register now</Link>}
      </Col>
      <Col className="col">
        <Button variant="primary" type="button" onClick={() => onLogin(email, password)}>Login</Button>
      </Col>
    </Form >
  )
}

export default Login