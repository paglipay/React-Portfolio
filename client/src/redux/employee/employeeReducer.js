import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_FAILURE
  } from './employeeTypes'
  
  const initialState = {
    loading: false,
    employees: [],
    error: ''
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EMPLOYEES_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_EMPLOYEES_SUCCESS:
        return {
          loading: false,
          employees: action.payload,
          error: ''
        }
      case FETCH_EMPLOYEES_FAILURE:
        return {
          loading: false,
          employees: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default reducer
  