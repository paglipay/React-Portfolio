import axios from 'axios'
import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT,
  READ_APPOINTMENT,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT,
} from './appointmentTypes'

export const fetchAppointments = () => {
  return (dispatch) => {
    dispatch(fetchAppointmentsRequest())
    axios
      .get('/api/appointments')
      .then(response => {
        // response.data is the users
        const appointments = response.data.results
        dispatch(fetchAppointmentsSuccess(appointments))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchAppointmentsFailure(error.message))
      })
  }
}

export const fetchAppointmentsRequest = () => {
  return {
    type: FETCH_APPOINTMENTS_REQUEST
  }
}

export const fetchAppointmentsSuccess = appointments => {
  return {
    type: FETCH_APPOINTMENTS_SUCCESS,
    payload: appointments
  }
}

export const fetchAppointmentsFailure = error => {
  return {
    type: FETCH_APPOINTMENTS_FAILURE,
    payload: error
  }
}

export const createAppointment = text => {
  return {
    type: CREATE_APPOINTMENT,
    payload: { text }
  }
}

export const readAppointment = id => {
  return {
    type: READ_APPOINTMENT,
    payload: { id }
  }
}

export const updateAppointment = id => {
  return {
    type: UPDATE_APPOINTMENT,
    payload: { id }
  }
}

export const deleteAppointment = id => {
  return {
    type: DELETE_APPOINTMENT,
    payload: { id }
  }
}
