import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import Login from "./Users/LoginModal";

function NavTabs({ authenticated, logout }) {
    // We'll go into the Hooks API later, for now, we are just using some code
    // from the react-router docs (https://reacttraining.com/react-router/web/api/Hooks/uselocation)
    // This allows the component to check the route any time the user uses a link to navigate.
    const location = useLocation();

    return (
        <>
            <Navbar bg="dark" variant="dark" className="mb-sm-3">
                <Navbar.Brand href="/">LL</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    {/* <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/blog">Blog</Nav.Link> */}
                    <Nav.Link href="/lobbylogin">LobbyLogin</Nav.Link>
                    <Nav.Link  as={Link} to="/">Home</Nav.Link>                    
                    {authenticated ? (
                        <Nav.Link  as={Link} to="/devices">Devices</Nav.Link>
                    ) : null }
                    <NavDropdown title="Components" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
                        <NavDropdown.Item href="/modalpage">Application</NavDropdown.Item>
                        <NavDropdown.Item href="/booksearch">Book Search</NavDropdown.Item>
                        <NavDropdown.Item href="/todo">Todo</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/employeedirectory">Directory</NavDropdown.Item>
                        <NavDropdown.Item href="/videochat">Video Chat</NavDropdown.Item>
                        <NavDropdown.Item href="/chat">Chat</NavDropdown.Item>
                        <NavDropdown.Item href="/users">Users</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    {authenticated ? (
                        <Button onClick={logout} >LOGOUT</Button>
                    ) : (
                        <Link to={`/login`} ><Button>Login</Button></Link>
                        )}
                </Form>
                <Form inline>
                    {authenticated ? (
                        <Button onClick={logout} >LOGOUT</Button>
                    ) : (
                            <Login />
                        )}
                </Form>
            </Navbar>
        </>
    );
}

export default NavTabs;
