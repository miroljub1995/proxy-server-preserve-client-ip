import React from 'react'
import {
  Navbar,
  Nav,
  NavDropdown
} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useUserStatus, logout } from './UserStatus'

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
      <Navbar.Brand href="/">Blog app</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/saved">Saved</Nav.Link>
        </Nav>
        <Nav>
          {userStatus.isAuthenticated || (<Nav.Link as={Link} to="/login">Login</Nav.Link>)}
          {userStatus.isAuthenticated && (
            <NavDropdown title={userStatus.email} id="basic-nav-dropdown">
              {/* <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item> */}
              <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
            </NavDropdown>)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation