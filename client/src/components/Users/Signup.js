import React from 'react'
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
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
                                    <Form.Text className="text-muted">
                                        username
                                    </Form.Text>
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
                            <p>
                                By clicking on "Register" you agree to The Company's' Terms and Conditions
				</p>
                            <p>
                                While rare, prices are subject to change based on exchange rate fluctuations -
                                should such a fluctuation happen, we may request an additional payment. You have the option to request a full refund or to pay the new price. (Paragraph 13.5.8)
				</p>
                            <p>
                                Should there be an error in the description or pricing of a product, we will provide you with a full refund (Paragraph 13.5.6)
				</p>
                            <p>
                                Acceptance of an order by us is dependent on our suppliers ability to provide the product. (Paragraph 13.5.6)
				</p>

                            <button type="submit" class="btn btn-primary signup">Register</button>

                        </Card.Body>
                    </Card>


                </Col>
            </Row>

        </Container>
    )
}

export default Signup
