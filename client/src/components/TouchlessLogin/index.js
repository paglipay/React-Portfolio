import React, { useState, useEffect, useRef, useContext } from 'react'
import QRCode from "react-qr-code";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import AvailableTimes from "../AvailableTimes";
import API from "../../utils/API";
import EmployeeDirectory from "../EmployeeDirectory/EmpDirModal";
import VisitorConfirm from "../VisitorConfirm";
import { v4 as uuidv4 } from 'uuid';

import EmployeeContext from "../../utils/employeeContext";

function TouchlessLogin(props) {
    const [appointments, setAppointments] = useState([]);
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showEmployeeDirectory, setShowEmployeeDirectory] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleConfirmClose = () => setShowConfirm(false);
    const handleConfirmShow = () => setShowConfirm(true);
    const [showSpinner, setShowSpinner] = useState(false)

    const [datepickerDisabled, setDatepickerDisabled] = useState(true)
    const [availableTimesList, setavailableTimesList] = useState([])

    const [formObject, setFormObject] = useState({})

    const { employee } = useContext(EmployeeContext);

    // Load all appointments and store them with setAppointments
    useEffect(() => {
        setFormObject({ ...formObject, uuid_id: props.uuid_id })
        console.log('TouchlessLogin: ', employee)

    }, [])



    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        console.log(name, value)
        setDatepickerDisabled(false)
        if (name === 'date') {
            setavailableTimesList([])
            setShowSpinner(true)
            API.getAvailableTimes(value)
                .then(res => {
                    setavailableTimesList(res.data)
                    setShowSpinner(false)
                })
                .catch(err => console.log(err));
            // setavailableTimesList(['1:00pm', '1:15pm'])
        }
        if (name === 'time') {
            setShow(true)
        }
        //employee
        setFormObject({ ...formObject, [name]: value })

    };

    // Loads all appointments and sets them to appointments
    function loadAppointments() {
        console.log('loadAppointments')
        API.getAppointments()
            .then(res => {
                setAppointments(res.data)
                const baseurl = window.location.href
                console.log('baseurl: ', baseurl)
                if (baseurl.includes('lobbylogin')) {
                    setShowConfirm(true)
                    // setTimeout(() => {
                    //     setShowConfirm(false);
                    //     props.LLsetShow(false);
                    //     props.setUuid_id(uuidv4())
                    // }, 6000);
                } else {
                    window.location.replace(`${window.origin}/visitorconfirm/${props.uuid_id}`);
                }
            })
            .catch(err => console.log(err));
    };

    // When the form is submitted, use the API.saveAppointment method to save the appointment data
    // Then reload appointments from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        console.log(formObject)
        setShow(false);

        // if (formObject.email && formObject.date && formObject.time) {
        console.log('API.saveAppointments')
        API.saveAppointments({
            uuid_id: formObject.uuid_id,
            email: formObject.email,
            employee: formObject.employee,
            datetime: new Date(formObject.date + ' ' + formObject.time),
        })
            .then(res => loadAppointments())
            .then(() => {
                setFormObject({
                email: '',
                employee: '',
                datetime: ""
            })
            
        
        })
            .catch(err => console.log(err));
        // }



    };


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        {/* <h1>UUID:{`${props.uuid_id}`}</h1> */}
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleInputChange} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmployee">
                                <Form.Label>Meeting with?</Form.Label>
                                <Form.Control type="text" name="employee" placeholder="Enter Name of Person" onChange={handleInputChange} onClick={() => setShowEmployeeDirectory(true)} />
                                <Form.Text className="text-muted">
                                    With whom would you like to set up an appointment with?
                            </Form.Text>
                            </Form.Group>
                            <AvailableTimes datepickerDisabled={datepickerDisabled} availableTimesList={availableTimesList} handleInputChange={handleInputChange} onClick={handleShow} showSpinner={showSpinner} setShowSpinner={setShowSpinner} />
                        </Form>
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Do you wish to make this appointment?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            Your appointment with: {formObject.employee}
                            <br />
                            Is set on: {formObject.date}
                            <br />
                            Do you wish to confirm?
                            <br />
                            A cofirmation email will be sent to: {formObject.email}
                        </p>
                        {/* <VisitorConfirm uuid_id={props.uuid_id} /> */}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleFormSubmit}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showConfirm} onHide={handleConfirmClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Your appointment has been submitted.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <VisitorConfirm uuid_id={props.uuid_id} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleConfirmClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <EmployeeDirectory show={showEmployeeDirectory} setShow={setShowEmployeeDirectory} />
            </Container>
        </>
    )
}

export default TouchlessLogin
