import React from "react";
import { Jumbotron, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { ArrowRight } from 'react-bootstrap-icons';
// import { MDBIcon } from "mdbreact";
// import BasicTable from '../../components/MDB/BasicTable/BasicTable'
// import Datatable from '../../components/MDB/Datatable/Datatable'
// import FeaturesPage from '../../components/MDB/FeaturesPage/FeaturesPage'
// import NavTabs from "../NavTabs";
import Todo from "../../components/Todo/App";

function Home() {
  return (
    <div>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: purple;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    .container {
      padding-top: 15px;
      padding-bottom: 15px;
    }
    `}
      </style>
      <Jumbotron style={{ backgroundImage: `url('https://source.unsplash.com/1600x300/?design')`, backgroundSize: 'cover', height: 500 }}>
        <h1>Hello, world!</h1>

        If you need someone to create a cool website for you and or business, you have come to the right page.

        <p>
          <Button variant="flat" size="xxl">Learn more</Button>
        </p>
      </Jumbotron>
      <section style= {{backgroundColor: '#f4f4f4', height: 500}} class="section section-icons grey lighten-4 center">
        <Container style={{ height: '100%' }}>
          <Row style={{ height: '100%' }}>
            <Col>

              <Card style={{ paddingTop: '15px', height: '100%' }}>
                {/* <MDBIcon style={{ textAlign: 'center' }} fab icon="amazon" size="5x" /> */}

                <Card.Body>
                  <Card.Title>We've got what you need!</Card.Title>
                  <Card.Text>
                  Knowlegable in HTML, Javascript, CSS, Nodejs, Sequelize, and much much more!!!
                </Card.Text>
                  <Button variant="flat">Get Started!</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ paddingTop: '15px', height: '100%' }}>
                {/* <MDBIcon style={{ textAlign: 'center' }} icon="camera-retro" size="5x" className="center" /> */}
                <Card.Body>
                  <Card.Title>At Your Service</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                  <Button variant="flat">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ paddingTop: '15px', height: '100%' }}>
                {/* <MDBIcon style={{ textAlign: 'center' }} icon="camera-retro" size="5x" /> */}
                <Card.Body>
                  <Card.Title>Let's Get In Touch!</Card.Title>
                  <Card.Text>
                  Ready to start your next project with me? Give me a call or send me an email and I will get back to you as soon as possible!
                </Card.Text>
                  <Button variant="flat">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col>
              <h1>Home Page</h1>

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna
              varius, blandit rhoncus sem. Morbi lacinia nisi ac dui fermentum, sed luctus urna tincidunt.
              Etiam ut feugiat ex. Cras non risus mi. Curabitur mattis rutrum ipsum, ut aliquet urna
              imperdiet ac. Sed nec nulla aliquam, bibendum odio eget, vestibulum tortor. Cras rutrum
              ligula in tincidunt commodo. Morbi sit amet mollis orci, in tristique ex. Donec nec ornare
              elit. Donec blandit est sed risus feugiat porttitor. Vestibulum molestie hendrerit massa non
              consequat. Vestibulum vitae lorem tortor. In elementum ultricies tempus. Interdum et
              malesuada fames ac ante ipsum primis in faucibus.

          </Col>
            <Col>
              <h1>Home Page</h1>

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque velit, lobortis ut magna
              varius, blandit rhoncus sem. Morbi lacinia nisi ac dui fermentum, sed luctus urna tincidunt.
              Etiam ut feugiat ex. Cras non risus mi.

          </Col>
            <Col>
              <h1>Home Page</h1>
              <p>
                Cras non risus mi. Curabitur mattis rutrum ipsum, ut aliquet urna
                imperdiet ac. Sed nec nulla aliquam, bibendum odio eget, vestibulum tortor. Cras rutrum
                ligula in tincidunt commodo. Morbi sit amet mollis orci, in tristique ex. Donec nec ornare
                elit. Donec blandit est sed risus feugiat porttitor. Vestibulum molestie hendrerit massa non
                consequat. Vestibulum vitae lorem tortor. In elementum ultricies tempus. Interdum et
                malesuada fames ac ante ipsum primis in faucibus.
            </p>
            </Col>
          </Row>

        </Container>
      </section>
      <section class="section section-icons grey lighten-4 center">
        <Container>

          <Row>
            <Col>
              {/* <FeaturesPage /> */}
            </Col>
          </Row>

        </Container>
      </section>
      <section>
        <Container>

          <Row>
            <Col>
              <Todo />
            </Col>
          </Row>

        </Container>
      </section>
      <section>
        <Container>

          <Row>
            <Col>
              {/* <Datatable /> */}
            </Col>
          </Row>

        </Container>
      </section>
      <section  style= {{backgroundColor: '#f4f4f4'}}>
        <Container>

          <Row>
            <Col xs={12} md={4}>
              <Card style={{ paddingTop: '15px' }}>
                {/* <MDBIcon style={{ textAlign: 'center' }} icon="camera-retro" size="5x" /> */}
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <Card style={{ paddingTop: '15px', height: '100%' }}>
                <Card.Body>
                  {/* <BasicTable /> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col><Card style={{ paddingTop: '15px' }}>
              <Card.Img variant="top" src="./logo192.png" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
              </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card></Col>
            <Col><Card style={{ paddingTop: '15px' }}>
              <Card.Img variant="top" src="./logo192.png" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
              </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card></Col>
            <Col><Card style={{ paddingTop: '15px' }}>
              <Card.Img variant="top" src="./logo192.png" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
              </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card></Col>
          </Row>
          <br />

          <Row>
            <Col xs={12} md={8}>
              <Card style={{ paddingTop: '15px', height: '100%' }}>
                <Card.Body>
                  <Todo />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card style={{ paddingTop: '15px', height: '100%' }}>
                {/* <MDBIcon style={{ textAlign: 'center' }} icon="camera-retro" size="5x" /> */}
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
