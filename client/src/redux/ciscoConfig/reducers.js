import {
    FETCH_CONFIGS_REQUEST,
    FETCH_CONFIGS_SUCCESS,
    FETCH_CONFIGS_FAILURE
  } from './configTypes'
  
  const initialState = {
    loading: false,
    configs: [],
    error: ''
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CONFIGS_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_CONFIGS_SUCCESS:
        return {
          loading: false,
          configs: action.payload,
          error: ''
        }
      case FETCH_CONFIGS_FAILURE:
        return {
          loading: false,
          configs: [],
          error: action.payload
        }
      default: return state
    }
  }
  
  export default reducer
  