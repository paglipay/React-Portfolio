import {
  FETCH_CONFIGS_REQUEST,
  FETCH_CONFIGS_SUCCESS,
  FETCH_CONFIGS_FAILURE,
  MARK_CONFIG_AS_ACTIVE,
  REMOVE_CONFIG
} from './configTypes'

const initialState = {
  loading: false,
  configs: [],
  activeConfig: '',
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
        // configs: state.configs.concat(action.payload),
        configs: action.payload,
        error: ''
      }
    case FETCH_CONFIGS_FAILURE:
      return {
        loading: false,
        configs: [],
        error: action.payload
      }

    case MARK_CONFIG_AS_ACTIVE: {
      const { configId } = action.payload;
      console.log('action.payload: ', action.payload)
      return {
        ...state,
        activeConfig: state.configs.find(config => config._id === configId)
      };

      // return state
    }

    case REMOVE_CONFIG: {
      const { config: configObj } = action.payload;
      console.log('configObj: ', configObj)
      const out = state.configs.filter(config => config._id !== configObj._id)
      console.log('out: ', out)
      return {
        ...state,
        configs: out,
      };
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
