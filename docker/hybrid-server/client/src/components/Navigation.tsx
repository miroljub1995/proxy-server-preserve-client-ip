import React from 'react'
import {
  Container, Nav, Navbar,

  NavDropdown
} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { logout, useUserStatus } from './UserStatus'
import Authenticated from './Authenticated'

function Navigation() {
  const [userStatus, setUserStatus] = useUserStatus()
  const history = useHistory()
  async function onLogout() {
    console.log('Logout')
    const res = await fetch(process.env.REACT_APP_API_ENDPOINT + '/logout', {
      method: 'POST',
      credentials: 'include'
    })
    if (res.status === 200) {
      setUserStatus(logout())
      history.push('/')
    }
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Authenticated>
              <Nav.Link as={Link} to="/create/post">Publish post</Nav.Link>
            </Authenticated>
          </Nav>
          <Nav>
            {userStatus.isAuthenticated || (<Nav.Link as={Link} to="/login">Login</Nav.Link>)}
            {userStatus.isAuthenticated && (
              <NavDropdown title={userStatus.user!.email} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/my/posts">My posts</NavDropdown.Item>
                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
              </NavDropdown>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation