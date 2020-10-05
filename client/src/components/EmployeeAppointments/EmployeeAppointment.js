import React, { useState, useEffect } from "react";
import DeleteBtn from "./components/DeleteBtn";
import Jumbotron from "./components/Jumbotron";
import API from "../../../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "./components/Grid";
import { List, ListItem } from "./components/List";
import { Time, Date as DateComponent, Input, TextArea, FormBtn } from "./components/Form";
import EmployeeModal from './EmployeeModal';
import Autocomplete from 'react-autocomplete';
import AvailableTimes from "../AvailableTimes";
import { v4 as uuidv4 } from 'uuid';
import { Button, Spinner } from 'react-bootstrap';

function EmployeeAppointment() {
  // Setting our component's initial state
  const [appointments, setAppointments] = useState([])
  const [formObject, setFormObject] = useState({ uuid_id: uuidv4() })
  const [employees, setEmployees] = useState([])
  const [user, setUser] = useState({name:{first:'Mahmoud', last:'Hijazi'}})
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const [datepickerDisabled, setDatepickerDisabled] = useState(true)
  const [availableTimesList, setavailableTimesList] = useState([])


  // Load all appointments and store them with setAppointments
  useEffect(() => {
    // loadAppointments()
    loadAppointmentsById('5f6170433c7ecd32a8c3cc93')
    loadEmployees()
  }, [])

  // Loads all appointments and sets them to appointments
  function loadAppointmentsById(id) {
    console.log('loadAppointmentsById: ', id)
    API.getAppointmentsById(id)
      .then(res => {
        // console.log(res.data.results[0])
        // setUser(res.data.results[0])
        setAppointments(res.data.results[0].appointments)}
      )      
      .catch(err => console.log(err));
  };

  // Loads all appointments and sets them to appointments
  function loadAppointments() {
    API.getAppointments()
      .then(res => setAppointments(res.data.results))
      .catch(err => console.log(err));
  };

  function loadEmployees() {
    API.getUsers()
      .then(res => setEmployees(res.data.results))
      .catch(err => console.log(err));
  };
  // Deletes an appointment from the database with a given id, then reloads appointments from the db
  function deleteAppointments(id) {
    API.deleteAppointments(id)
      .then(res => loadAppointmentsById('5f6170433c7ecd32a8c3cc93'))
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(name, value)
    setDatepickerDisabled(false)
    if (name === 'date') {
      API.getAvailableTimes(value)
        .then(res => setavailableTimesList(res.data))
        .catch(err => console.log(err));      
    }   
    setFormObject({ ...formObject, [name]: value })
  };

  // When the form is submitted, use the API.saveAppointment method to save the appointment data
  // Then reload appointments from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.name && formObject.phone && formObject.email && formObject.employee && formObject.info) {
      console.log(formObject)
      API.saveAppointments({
        uuid_id: formObject.uuid_id,
        name: formObject.name,
        phone: formObject.phone,
        email: formObject.email,
        employee: formObject.employee,
        datetime: new Date(formObject.date + ' ' + formObject.time),
        info: formObject.info
      })
        .then(res => loadAppointmentsById('5f6170433c7ecd32a8c3cc93'))
        .then(() => setFormObject({
          uuid_id: '',
          name: '',
          phone: '',
          email: '',
          employee: '',
          date: "",
          time: "",
          datetime: "",
          info: ''
        }))
        .then()
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-6">
          <Jumbotron>
          <img className="card-img" src="https://randomuser.me/api/portraits/men/80.jpg" alt="Suresh Dasari Card" style={{height:"150px" , width:"150px"}} /> 
            <h1>{user.name.first} {user.name.last}</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="name"
              placeholder="Clients Name (required)"
              value={formObject.name}
            />
            <Input
              onChange={handleInputChange}
              name="phone"
              placeholder="Clients Phone Number (required)"
              value={formObject.phone}
            />
            <Input
              onChange={handleInputChange}
              name="email"
              placeholder="Clients Email Address (required)"
              value={formObject.email}
            />            
            <Autocomplete
              inputProps={{
                placeholder: "Select Employee (Required)",
                className: "form-control",
                name: "employee",
                style: {
                  width: '100%'
                }
              }}
              wrapperStyle={{ width: '100%', marginBottom: '10px' }}
              getItemValue={(item) => item.id}
              // items={employees.map(employee => ({ id: employee.id.ssn, label: employee.name.first + ' ' + employee.name.last }))}
              items={employees.map(employee => ({ id: employee.email, label: ` <${employee.name.first} ${employee.name.last}> ${employee.email}` }))}
              renderItem={(item, isHighlighted) =>
                <div key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                  {item.label}
                </div>
              }
              value={formObject.employee}
              onChange={handleInputChange}
              name="employee"
              placeholder="Select Employee (Required)"
              onSelect={(val) => setFormObject({ ...formObject, employee: val })}
            />
            <AvailableTimes datepickerDisabled={datepickerDisabled} availableTimesList={availableTimesList} handleInputChange={handleInputChange} onClick={handleShow} />
            <TextArea
              onChange={handleInputChange}
              name="info"
              placeholder="Meeting Info (Required)"
              value={formObject.info}
            />
             
            <FormBtn

              disabled={!(formObject.name && formObject.phone && formObject.email && formObject.employee && formObject.date && formObject.info)}
              onClick={handleFormSubmit}
            >
              Submit
         
              </FormBtn>
             
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>

            <svg width="5em" height="5em" viewBox="0 0 16 16" class="bi bi-table" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
            </svg>
            <h1>Client's Appiontments</h1>
          </Jumbotron>
          {appointments.length ? (
            <List>
              {appointments.map(appointment => (
                <ListItem key={appointment._id}>
                  <EmployeeModal
                    name={appointment.name}
                    phone={appointment.phone}
                    email={appointment.email}
                    employee={appointment.employee}
                    info={appointment.info}
                    datetime={appointment.datetime}
                  />
                  <DeleteBtn onClick={() => deleteAppointments(appointment._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
      </Row>
    </Container>
  );
}


export default EmployeeAppointment;
