import { combineReducers } from 'redux'
// import cakeReducer from './cake/cakeReducer'
// import iceCreamReducer from './iceCream/iceCreamReducer'
import userReducer from './user/userReducer'
import employeeReducer from './employee/employeeReducer'
import appointmentReducer from './appointment/appointmentReducer'

const rootReducer = combineReducers({
  // cake: cakeReducer,
  // iceCream: iceCreamReducer,
  user: userReducer,
  employee: employeeReducer,
  appointment: appointmentReducer
})

export default rootReducer
