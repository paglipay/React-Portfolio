import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAILURE
} from './appointmentTypes'

const initialState = {
  loading: false,
  appointments: [],
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPOINTMENTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_APPOINTMENTS_SUCCESS:
      return {
        loading: false,
        appointments: action.payload,
        error: ''
      }
    case FETCH_APPOINTMENTS_FAILURE:
      return {
        loading: false,
        appointments: [],
        error: action.payload
      }
    default: return state
  }
}

export default reducer
