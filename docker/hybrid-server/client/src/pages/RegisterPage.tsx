import React, { useCallback } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useInput } from '../components/CustomHooks'

function Register() {
  const [email, setEmail] = useInput()
  const [password, setPassword] = useInput()
  const history = useHistory()

  const handleRegister = useCallback(async () => {
    console.log('registering', email, password)
    const res = await fetch(process.env.REACT_APP_API_ENDPOINT + "/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    if (res.status === 200) {
      history.push('/login')
    }
  }, [email, password, history])

  return (
    <Form>
      <Form.Group className="col-4">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={setEmail} />
      </Form.Group>
      <Form.Group className="col-4">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={setPassword} />
      </Form.Group>
      <Col className="col">
        <Button variant="primary" type="button" onClick={handleRegister}>Register</Button>
      </Col>
    </Form>
  )
}

export default Register