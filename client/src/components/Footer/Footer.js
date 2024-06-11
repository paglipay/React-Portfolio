import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
  Alert,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  return (
    <div>
      {/* Footer using react Bootstrap*/}
      <footer
        className="bg-dark text-white mt-5 p-4 text-center"
      >
        <div style={{}}>
          <div className="row">
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Explore</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Home</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Our Company</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Case Studies</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Blog</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Forum</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Services</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Documentation</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Marketplace</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Design</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Resources</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Follow us</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Facebook</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Twitter</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Linkedin</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Instagram</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>Get in touch</a>
                </li>
                <li>
                  <a href="mailto:info@yourcompany.com">info@yourcompany.com</a>
                </li>
                <li>
                  <a href="tel:+16505550111">+1 (650) 555-0111</a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>MyCompany</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>250 Executive Park Blvd, Suite 3400</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>San Francisco CA 94134</a>
                </li>
                <li>
                  <a href="#" className="nav-link" style={{textAlign:"left"}}>United States</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
