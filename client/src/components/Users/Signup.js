import React from "react";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
function Signup() {
  return (
    <Container className="mt-sm-5">
      <Row>
        <Col>
          <Card>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="username" placeholder="Enter username" />
                  <Form.Text className="text-muted">username</Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <h3 class="dark-grey">Terms and Conditions</h3>
              <div>
                <h2>Terms and Agreement</h2>
                <p>
                  Welcome to [Your Personal Portfolio Website]! By signing up
                  and accessing the services provided by this website, you agree
                  to be bound by the following terms and conditions:
                </p>
                <ol>
                  <li>
                    <strong>Acceptance of Terms:</strong> By using this website
                    and its services, you acknowledge that you have read,
                    understood, and agree to abide by all terms and conditions
                    outlined in this agreement.
                  </li>
                  <li>
                    <strong>User Account:</strong> You must create an account to
                    access certain features of the website. You are responsible
                    for maintaining the confidentiality of your account
                    credentials and for all activities that occur under your
                    account.
                  </li>
                  <li>
                    <strong>Accuracy of Information:</strong> You agree to
                    provide accurate, current, and complete information during
                    the registration process and to update such information to
                    keep it accurate, current, and complete.
                  </li>
                  <li>
                    <strong>Content Ownership:</strong> You retain ownership of
                    any content you upload, post, or otherwise make available on
                    the website. However, by submitting content, you grant [Your
                    Name or Website Name] a worldwide, non-exclusive,
                    royalty-free license to use, reproduce, modify, adapt,
                    publish, translate, distribute, and display such content.
                  </li>
                  <li>
                    <strong>Prohibited Activities:</strong> You agree not to
                    engage in any of the following activities:
                    <ul>
                      <li>- Violating any applicable laws or regulations.</li>
                      <li>
                        - Infringing upon the rights of others, including
                        intellectual property rights.
                      </li>
                      <li>
                        - Uploading or transmitting viruses or any other
                        malicious code.
                      </li>
                      <li>
                        - Engaging in any activity that disrupts, interferes
                        with, or inhibits any other user's use and enjoyment of
                        the website.
                      </li>
                      <li>
                        - Attempting to gain unauthorized access to any portion
                        or feature of the website.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Privacy Policy:</strong> Your use of this website is
                    also governed by our Privacy Policy, which can be found
                    [link to privacy policy]. By using this website, you consent
                    to the collection and use of your information as described
                    in the Privacy Policy.
                  </li>
                  <li>
                    <strong>Limitation of Liability:</strong> [Your Name or
                    Website Name] shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages
                    arising out of or relating to your use of the website,
                    including but not limited to loss of data, loss of profits,
                    or any other economic advantage.
                  </li>
                  <li>
                    <strong>Indemnification:</strong> You agree to indemnify and
                    hold harmless [Your Name or Website Name] and its
                    affiliates, officers, directors, employees, agents, and
                    licensors from and against any and all claims, liabilities,
                    damages, losses, costs, expenses, or fees (including
                    reasonable attorneys' fees) arising from your use of the
                    website or any violation of these terms and conditions.
                  </li>
                  <li>
                    <strong>Modification of Terms:</strong> [Your Name or
                    Website Name] reserves the right to modify or revise these
                    terms and conditions at any time without prior notice. Your
                    continued use of the website following the posting of any
                    changes constitutes acceptance of those changes.
                  </li>
                  <li>
                    <strong>Governing Law:</strong> This agreement shall be
                    governed by and construed in accordance with the laws of
                    [Your Country], without regard to its conflict of law
                    principles.
                  </li>
                </ol>
                <p>
                  By signing up for an account on [Your Personal Portfolio
                  Website], you acknowledge that you have read, understood, and
                  agree to be bound by these terms and conditions.
                </p>
                <p>
                  If you have any questions or concerns regarding these terms
                  and conditions, please contact us at [Your Contact
                  Information].
                </p>
              </div>

              <button type="submit" class="btn btn-primary signup">
                Register
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
