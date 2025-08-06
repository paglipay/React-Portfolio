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
          {/* <Nav.Link as={Link} to="/">
            Home
          </Nav.Link> */}
          <NavDropdown title="Projects" id="collasible-nav-dropdown">

          <NavDropdown.Item
            as="a"
            href="https://heimdall.paglipay.info/"
            target="_blank"
          >
            Heimdall
          </NavDropdown.Item>

          <NavDropdown.Item
            as="a"
            href="https://yoom.paglipay.info/"
            target="_blank"
          >
            Yoom
          </NavDropdown.Item>
          <NavDropdown.Item
            as="a"
            href="https://plura.paglipay.info/"
            target="_blank"
          >
            Plura
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
              Instant Interview
            </NavDropdown.Item>
            
            <NavDropdown.Item as={Link} to="/camera">
              Shutterbox
            </NavDropdown.Item>
            
            <NavDropdown.Item as={Link} to="/facedetection">
              Face Detection
            </NavDropdown.Item>
            
            <NavDropdown.Item as={Link} to="/lobbylogin">
              LobbyLogin
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/devices">
              Devices
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/dtree">
              DTree
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link
            as="a"
            href="https://services.paglipay.info/checkout"
            target="_blank"
          >
            Services
          </Nav.Link>
          <Nav.Link
            as="a"
            href="https://paglipay-portfolio-resume-f83d641338bb.herokuapp.com/"
            target="_blank"
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
              <Nav.Link as={Link} to="/chart">
                Client Dashboard
              </Nav.Link>
            </>
          ) : null}
          {/* <Alert variant="danger" dismissible className="mt-3">                
                        <Alert.Heading>Work in Progress</Alert.Heading>
                            <p>
                                Thank you for visiting. Paglipay is currently under maintenance, but feel free to explore as some of the functionality is available for testing.
                            </p>
                    </Alert> */}
        </Nav>
        {/* <Nav>
          <Nav.Link as={Link} to="/signup">
            Sign In
          </Nav.Link>
        </Nav> */}
        {/* <Form inline> */}

        <Nav>
          {authenticated ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            // <Link to={`/login`}>
            //   <Button>Login</Button>
            // </Link>
            <Nav.Link as={Link} to="/login">
              Sign In
            </Nav.Link>
          )}
        </Nav>
        {/* <Link to={`/signup`}>
          <Button>Get Started</Button>
        </Link> */}
        {/* </Form> */}
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
