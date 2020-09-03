import React, { useCallback } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { useInput } from '../components/CustomHooks'
import { login, useUserStatus } from '../components/UserStatus'
import { UserSchema } from '../api/types'

function Login() {
  const [email, setEmail] = useInput()
  const [password, setPassword] = useInput()
  const [userStatus, changeStatus] = useUserStatus()

  const handleLogin = useCallback(() => {
    console.log('logging in', email, password)
    fetch(process.env.REACT_APP_API_ENDPOINT + "/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
      .then(async res => {
        if (res.status !== 200) {
          console.log('Failed to login')
        }
        else {
          const userInfo = UserSchema.cast(await res.json())
          changeStatus(login(userInfo))
        }
      })
  }, [email, password, changeStatus])

  if (userStatus.isAuthenticated) {
    return (
      <Redirect push to="/" />
    )
  }

  return (
    <Form>
      <Form.Group className="col-4">
        <Form.Label>Email address</Form.Label >
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={setEmail} />
      </Form.Group >
      <Form.Group className="col-4">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={setPassword} />
      </Form.Group>
      <Col>
        Do not have account? {<Link to="/register">Register now</Link>}
      </Col>
      <Col className="col">
        <Button variant="primary" type="button" onClick={handleLogin}>Login</Button>
      </Col>
    </Form >
  )
}

export default Login