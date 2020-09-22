import { combineReducers } from 'redux'
// import cakeReducer from './cake/cakeReducer'
// import iceCreamReducer from './iceCream/iceCreamReducer'
import userReducer from './user/userReducer'
import employeeReducer from './employee/employeeReducer'

const rootReducer = combineReducers({
  // cake: cakeReducer,
  // iceCream: iceCreamReducer,
  user: userReducer,
  employee: employeeReducer
})

export default rootReducer
