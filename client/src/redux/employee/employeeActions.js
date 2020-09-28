import axios from 'axios'
import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE
} from './employeeTypes'

export const fetchEmployees = () => {
  return (dispatch) => {
    dispatch(fetchEmployeesRequest())
    axios
      .get('/api/employees')
      .then(response => {
        // response.data is the users
        const employees = response.data.results
        dispatch(fetchEmployeesSuccess(employees))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchEmployeesFailure(error.message))
      })
  }
}

export const fetchEmployeesRequest = () => {
  return {
    type: FETCH_EMPLOYEES_REQUEST
  }
}

export const fetchEmployeesSuccess = users => {
  return {
    type: FETCH_EMPLOYEES_SUCCESS,
    payload: users
  }
}

export const fetchEmployeesFailure = error => {
  return {
    type: FETCH_EMPLOYEES_FAILURE,
    payload: error
  }
}
