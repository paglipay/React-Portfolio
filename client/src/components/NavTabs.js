import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
  Alert,
} from "react-bootstrap";
import Login from "./Users/LoginModal";

function NavTabs({ authenticated, logout }) {
  // We'll go into the Hooks API later, for now, we are just using some code
  // from the react-router docs (https://reacttraining.com/react-router/web/api/Hooks/uselocation)
  // This allows the component to check the route any time the user uses a link to navigate.
  const location = useLocation();

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand as={Link} to="/">
          PA
        </Navbar.Brand>

        <Nav className="mr-auto">
          {/* <Nav.Link as={Link} to="/about">About</Nav.Link>
                    <Nav.Link as={Link} to="/blog">Blog</Nav.Link> */}
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link
            as="a"
            href="https://paglipay-portfolio-resume-f83d641338bb.herokuapp.com/"
          >
            Resume
          </Nav.Link>
          {/* <Nav.Link as={Link} to="/">Resume</Nav.Link>
                    <Nav.Link as={Link} to="/">Blog</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link> */}
          {/* <Nav.Link as={Link} to="/lobbylogin">LobbyLogin</Nav.Link> */}
          {authenticated ? (
            <>
              <Nav.Link as={Link} to="/devices">
                Devices
              </Nav.Link>
              <Nav.Link as={Link} to="/members">
                Members
              </Nav.Link>
            </>
          ) : null}
          <NavDropdown title="Projects" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/lobbylogin">
              LobbyLogin
            </NavDropdown.Item>
            {/* <NavDropdown.Item as={Link} to="/admin">Admin</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/employeeappointments">Appointments</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/booksearch">Book Search</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/todo">Todo</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to="/employeedirectory">Directory</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/videochat">Video Chat</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/chat">Chat</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/users">Users</NavDropdown.Item> */}
            <NavDropdown.Item as={Link} to="/dynamicform">
              Form
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/devices">
              Devices
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/dtree">
              DTree
            </NavDropdown.Item>
          </NavDropdown>
          {/* <Alert variant="danger" dismissible className="mt-3">                
                        <Alert.Heading>Work in Progress</Alert.Heading>
                            <p>
                                Thank you for visiting. Paglipay is currently under maintenance, but feel free to explore as some of the functionality is available for testing.
                            </p>
                    </Alert> */}
        </Nav>
        <Form inline>
          {authenticated ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Link to={`/login`}>
              <Button>Login</Button>
            </Link>
          )}
        </Form>
        {/* <Form inline>
                    {authenticated ? (
                        <Button onClick={logout} >LOGOUT</Button>
                    ) : (
                            <Login />
                        )}
                </Form> */}
      </Navbar>
    </>
  );
}

export default NavTabs;
