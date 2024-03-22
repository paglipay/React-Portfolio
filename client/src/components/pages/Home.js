import React from "react";
import {
  Jumbotron,
  Button,
  Card,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Modal,
} from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
// import { MDBIcon } from "mdbreact";
// import BasicTable from '../../components/MDB/BasicTable/BasicTable'
// import Datatable from '../../components/MDB/Datatable/Datatable'
// import FeaturesPage from '../../components/MDB/FeaturesPage/FeaturesPage'
// import NavTabs from "../NavTabs";
import Todo from "../../components/Todo/App";
import DTree from "../../components/DTree";
// import ReactPlayer from 'react-player'

function Home() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
    .jumbotron {      
      margin-bottom: 0px;
    }
    `}
      </style>
      <Jumbotron
        style={{
          backgroundImage: `url('https://source.unsplash.com/1600x300/?design')`,
          backgroundSize: "cover",
          height: 500,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.75)",
            padding: "100px",
            margin: "-25px 0px",
          }}
        >
          <h1>Welcome to Paul Aglipay's Portfolio Site!</h1>
          Skilled Software Developer with experience in Network / Systems
          Engineering. Experienced Programmer Analyst / Network Engineer with a
          demonstrated history of working in the higher education industry.
          Proficient in Full-Stack development particularly in the MERN stack.
          <br />
          <br />
          <p>
            <Button variant="flat" size="xxl" onClick={handleShow}>
              Learn more
            </Button>

            <Modal size="lg" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Now with AI Assistance! How to use...</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Select Showcase Categories to view Featured Projects.
                <br />
                <br />
                Please use our chatbot to ask any questions you may have about
                the developer or anything about life in general.
                <br />
                <br />
                A great place to start would be the "Docker Swarm" demos.
                <br />
                <br />
                {/* <ReactPlayer url="https://youtu.be/bNxdUh4Ogwc?si=3-ZcpK6xD28E07IQ" controls={true} /> */}
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/RAqPD-EjAT4?si=ImuK_IECZsavRViz"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {/* <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button> */}
              </Modal.Footer>
            </Modal>
          </p>
        </div>
      </Jumbotron>
      <section className="section section-icons grey lighten-4 center">
        <Container fluid>
          <Row>
            <DTree />
          </Row>
        </Container>
      </section>
      <section
        style={{ backgroundColor: "#f4f4f4" }}
        className="section section-icons grey lighten-4 center"
      >
        <Container style={{ height: "100%" }}>
          <Row style={{ height: "100%" }}>
            <Col>
              <Card style={{ paddingTop: "15px", height: "100%" }}>
                {/* <MDBIcon style={{ textAlign: 'center' }} fab icon="amazon" size="5x" /> */}

                <Card.Body>
                  <Card.Title>We've got what you need!</Card.Title>
                  <Card.Text>
                    Knowlegable in HTML, Javascript, CSS, Nodejs, Sequelize, and
                    much much more!!!
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="flat">Get Started!</Button>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card style={{ paddingTop: "15px", height: "100%" }}>
                {/* <MDBIcon style={{ textAlign: 'center' }} icon="camera-retro" size="5x" className="center" /> */}
                <Card.Body>
                  <Card.Title>At Your Service</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="flat">Get Started!</Button>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card style={{ paddingTop: "15px", height: "100%" }}>
                {/* <MDBIcon style={{ textAlign: 'center' }} icon="camera-retro" size="5x" /> */}
                <Card.Body>
                  <Card.Title>Let's Get In Touch!</Card.Title>
                  <Card.Text>
                    Ready to start your next project with me? Give me a call or
                    send me an email and I will get back to you as soon as
                    possible!
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button variant="flat">Get Started!</Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col>
              <h1>Featured Project</h1>
              <p>
                Cisco Configuration Parser - Skilled Software Developer with
                experience in Network / Systems Engineering. Experienced
                Programmer Analyst / Network Engineer with a demonstrated
                history of working in the higher education industry. Proficient
                in Full-Stack development particularly in the MERN stack.{" "}
              </p>
              <Button variant="flat">Learn more</Button>
            </Col>
            <Col>
              <h1>Home Page</h1>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque
              velit, lobortis ut magna varius, blandit rhoncus sem. Morbi
              lacinia nisi ac dui fermentum, sed luctus urna tincidunt. Etiam ut
              feugiat ex. Cras non risus mi.
            </Col>
            <Col>
              <h1>Home Page</h1>
              <p>
                Cras non risus mi. Curabitur mattis rutrum ipsum, ut aliquet
                urna imperdiet ac. Sed nec nulla aliquam, bibendum odio eget,
                vestibulum tortor. Cras rutrum ligula in tincidunt commodo.
                Morbi sit amet mollis orci, in tristique ex. Donec nec ornare
                elit. Donec blandit est sed risus feugiat porttitor. Vestibulum
                molestie hendrerit massa non consequat. Vestibulum vitae lorem
                tortor. In elementum ultricies tempus. Interdum et malesuada
                fames ac ante ipsum primis in faucibus.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section section-icons grey lighten-4 center">
        <Container>
          <Row>
            <Col>{/* <FeaturesPage /> */}</Col>
          </Row>
        </Container>
      </section>
      {/* <section>
        <Container>
          <Row>
            <Col>
              <Todo />
            </Col>
          </Row>
        </Container>
      </section> */}
      <section>
        <Container>
          <Row>
            <Col>{/* <Datatable /> */}</Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Home">
              <br />
              <Row>
                <Col xs={12} md={4}>
                  <Card style={{ paddingTop: "15px" }}>
                    {/* <MDBIcon style={{ textAlign: 'center' }} icon="camera-retro" size="5x" /> */}
                    <Card.Body>
                      <Card.Title>UCLA Campus Backbone</Card.Title>
                      <Card.Text>
                        Network Engineer / Programmer Analyst III
                        <br />
                        UCLA Campus Backbone - Los Angeles, CA October
                        <br />
                        2016 to Present
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={8}>
                  <Card style={{ paddingTop: "15px", height: "100%" }}>
                    <Card.Body>
                      <Card.Title>Work Experience</Card.Title>
                      <pre>
                        Building Router upgrade lifecycle replacement –
                        Scheduled, coordinated and, assisted with Building
                        Router site audits and IOS updates. Assisted in the
                        installation as required. Manage and implement a project
                        plan for upgrade of existing Cisco 3750X to Cisco 9500
                        Edge Switch upgrade lifecycle replacement – Scheduled,
                        coordinated and, assisted with Edge Switches site audits
                        and IOS updates. Assisted in the installation as
                        required. Manage and implement a project plan for
                        upgrade of existing Cisco WS-C3750-24P, WS-C3560-24PS,
                        WS-C3750V2-24PS- edge device Upgrade to 9300 Acatel
                        Switch upgrade lifecycle replacement – Scheduled,
                        coordinated and, assisted with Acatel Switches site
                        audits and IOS updates. Assisted in the installation as
                        required. Manage and implement a project plan for
                        upgrade of existing OS6400, OS6850, - mns devices
                        Upgrade to Cisco 3850 Updated Access for all network
                        gear to ssh - Update and Change all VTY access control
                        lists to allow ssh and disallow telnet. Audited /
                        Software Upgraded and completed configurations on
                        capable device models. Oversaw active projects to ensure
                        progress towards successful completion; provide timely
                        updates to Manager - Provide timely updates to Senior
                        Manager on IPv4 to IPv6 traffic percentages – ongoing
                        Submit monthly report to manager Migration to MNS –
                        Performed a complete audit of switches and their
                        locations and participate in meetings towards the
                        migration path to MNS. Network Monitoring Tools Handover
                        – Perform scheduled maintenance tasks and configuration
                        updates, to internal monitoring and configuration backup
                        systems of network infrastructure devices. Tools
                        include: RANCID / GitLab / Hound, Naemon / Nagios,
                        Netdisco, telalert, and, other various in-house
                        developed web application Slingware Informacast
                        Implementation for Anderson School - Informacast is a
                        proprietary Voice over IP network protocol for live
                        audio paging. Work with Network Engineering as they test
                        in the lab environment, and track / plan for production
                        implementation at the Anderson School campus location.
                        Qualys Access ACL Audit and Implementation - Work with
                        Network Security and Network Services to gather campus
                        device interface ACL configurations requirements.
                        Validate implementation and compliance of requirements
                        to campus network infrastructure.
                      </pre>
                      {/* <BasicTable /> */}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="profile" title="Profile">
              profile
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
              contact
            </Tab>
          </Tabs>
        </Container>
      </section>
      <section style={{ backgroundColor: "#f4f4f4" }}>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <Card style={{ paddingTop: "15px" }}>
                {/* <MDBIcon style={{ textAlign: 'center' }} icon="camera-retro" size="5x" /> */}
                <Card.Body>
                  <Card.Title>UCLA Campus Backbone</Card.Title>
                  <Card.Text>
                    Network Engineer / Programmer Analyst III
                    <br />
                    UCLA Campus Backbone - Los Angeles, CA October
                    <br />
                    2016 to Present
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <Card style={{ paddingTop: "15px", height: "100%" }}>
                <Card.Body>
                  <Card.Title>Work Experience</Card.Title>
                  <pre>
                    Building Router upgrade lifecycle replacement – Scheduled,
                    coordinated and, assisted with Building Router site audits
                    and IOS updates. Assisted in the installation as required.
                    Manage and implement a project plan for upgrade of existing
                    Cisco 3750X to Cisco 9500 Edge Switch upgrade lifecycle
                    replacement – Scheduled, coordinated and, assisted with Edge
                    Switches site audits and IOS updates. Assisted in the
                    installation as required. Manage and implement a project
                    plan for upgrade of existing Cisco WS-C3750-24P,
                    WS-C3560-24PS, WS-C3750V2-24PS- edge device Upgrade to 9300
                    Acatel Switch upgrade lifecycle replacement – Scheduled,
                    coordinated and, assisted with Acatel Switches site audits
                    and IOS updates. Assisted in the installation as required.
                    Manage and implement a project plan for upgrade of existing
                    OS6400, OS6850, - mns devices Upgrade to Cisco 3850 Updated
                    Access for all network gear to ssh - Update and Change all
                    VTY access control lists to allow ssh and disallow telnet.
                    Audited / Software Upgraded and completed configurations on
                    capable device models. Oversaw active projects to ensure
                    progress towards successful completion; provide timely
                    updates to Manager - Provide timely updates to Senior
                    Manager on IPv4 to IPv6 traffic percentages – ongoing Submit
                    monthly report to manager Migration to MNS – Performed a
                    complete audit of switches and their locations and
                    participate in meetings towards the migration path to MNS.
                    Network Monitoring Tools Handover – Perform scheduled
                    maintenance tasks and configuration updates, to internal
                    monitoring and configuration backup systems of network
                    infrastructure devices. Tools include: RANCID / GitLab /
                    Hound, Naemon / Nagios, Netdisco, telalert, and, other
                    various in-house developed web application Slingware
                    Informacast Implementation for Anderson School - Informacast
                    is a proprietary Voice over IP network protocol for live
                    audio paging. Work with Network Engineering as they test in
                    the lab environment, and track / plan for production
                    implementation at the Anderson School campus location.
                    Qualys Access ACL Audit and Implementation - Work with
                    Network Security and Network Services to gather campus
                    device interface ACL configurations requirements. Validate
                    implementation and compliance of requirements to campus
                    network infrastructure.
                  </pre>
                  {/* <BasicTable /> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <Card style={{ paddingTop: "15px" }}>
                {/* <MDBIcon style={{ textAlign: 'center' }} icon="camera-retro" size="5x" /> */}
                <Card.Body>
                  <Card.Title>UCLA Campus Backbone</Card.Title>
                  <Card.Text>
                    Network Engineer / Programmer Analyst III
                    <br />
                    UCLA Campus Backbone - Los Angeles, CA October
                    <br />
                    2016 to Present
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <Card style={{ paddingTop: "15px", height: "100%" }}>
                <Card.Body>
                  <Card.Title>Work Experience</Card.Title>
                  <pre>
                    Building Router upgrade lifecycle replacement – Scheduled,
                    coordinated and, assisted with Building Router site audits
                    and IOS updates. Assisted in the installation as required.
                    Manage and implement a project plan for upgrade of existing
                    Cisco 3750X to Cisco 9500 Edge Switch upgrade lifecycle
                    replacement – Scheduled, coordinated and, assisted with Edge
                    Switches site audits and IOS updates. Assisted in the
                    installation as required. Manage and implement a project
                    plan for upgrade of existing Cisco WS-C3750-24P,
                    WS-C3560-24PS, WS-C3750V2-24PS- edge device Upgrade to 9300
                    Acatel Switch upgrade lifecycle replacement – Scheduled,
                    coordinated and, assisted with Acatel Switches site audits
                    and IOS updates. Assisted in the installation as required.
                    Manage and implement a project plan for upgrade of existing
                    OS6400, OS6850, - mns devices Upgrade to Cisco 3850 Updated
                    Access for all network gear to ssh - Update and Change all
                    VTY access control lists to allow ssh and disallow telnet.
                    Audited / Software Upgraded and completed configurations on
                    capable device models. Oversaw active projects to ensure
                    progress towards successful completion; provide timely
                    updates to Manager - Provide timely updates to Senior
                    Manager on IPv4 to IPv6 traffic percentages – ongoing Submit
                    monthly report to manager Migration to MNS – Performed a
                    complete audit of switches and their locations and
                    participate in meetings towards the migration path to MNS.
                    Network Monitoring Tools Handover – Perform scheduled
                    maintenance tasks and configuration updates, to internal
                    monitoring and configuration backup systems of network
                    infrastructure devices. Tools include: RANCID / GitLab /
                    Hound, Naemon / Nagios, Netdisco, telalert, and, other
                    various in-house developed web application Slingware
                    Informacast Implementation for Anderson School - Informacast
                    is a proprietary Voice over IP network protocol for live
                    audio paging. Work with Network Engineering as they test in
                    the lab environment, and track / plan for production
                    implementation at the Anderson School campus location.
                    Qualys Access ACL Audit and Implementation - Work with
                    Network Security and Network Services to gather campus
                    device interface ACL configurations requirements. Validate
                    implementation and compliance of requirements to campus
                    network infrastructure.
                  </pre>
                  {/* <BasicTable /> */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Card style={{ paddingTop: "15px" }}>
                <Card.Img variant="top" src="./logo192.png" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ paddingTop: "15px" }}>
                <Card.Img variant="top" src="./logo192.png" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ paddingTop: "15px" }}>
                <Card.Img variant="top" src="./logo192.png" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />

          <Row>
            <Col xs={12} md={8}>
              <Card style={{ paddingTop: "15px", height: "100%" }}>
                <Card.Body>
                  <Todo />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card style={{ paddingTop: "15px", height: "100%" }}>
                {/* <MDBIcon style={{ textAlign: 'center' }} icon="camera-retro" size="5x" /> */}
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
