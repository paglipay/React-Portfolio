import {
  FETCH_CONFIGS_REQUEST,
  FETCH_CONFIGS_SUCCESS,
  FETCH_CONFIGS_FAILURE,
  CREATE_CONFIG
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
        // configs: action.payload,
        configs: state.configs.concat(action.payload),
        error: ''
      }
    case FETCH_CONFIGS_FAILURE:
      return {
        loading: false,
        configs: [],
        error: action.payload
      }
    // case CREATE_CONFIG:
    //   return {
    //     ...state,
    //         configs: state.configs,
    //   }
    default: return state
  }
}

export default reducer
