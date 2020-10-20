import axios from 'axios'
import {
  FETCH_CONFIGS_REQUEST,
  FETCH_CONFIGS_SUCCESS,
  FETCH_CONFIGS_FAILURE
} from './configTypes'

export const addConfigRequest = (data) => {
  return (dispatch) => {
    // dispatch(fetchConfigsRequest())
    console.log('addConfigRequest: ', data)
    axios
      .post('/api/configs', {
        name: 'TEST',
        config: data
      })
      .then(response => {
        // response.data is the users
        const configs = response.data.results
        dispatch(fetchConfigsSuccess(true))
        dispatch(createConfig(configs));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchConfigsFailure(error.message))
      })
  }
}

export const fetchConfigs = () => {
  return (dispatch) => {
    dispatch(fetchConfigsRequest())
    axios
      .get('/api/configs')
      .then(response => {
        // response.data is the users
        const configs = response.data.results
        dispatch(fetchConfigsSuccess(configs))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchConfigsFailure(error.message))
      })
  }
}

export const fetchConfigsRequest = () => {
  return {
    type: FETCH_CONFIGS_REQUEST
  }
}

export const fetchConfigsSuccess = users => {
  return {
    type: FETCH_CONFIGS_SUCCESS,
    payload: users
  }
}

export const fetchConfigsFailure = error => {
  return {
    type: FETCH_CONFIGS_FAILURE,
    payload: error
  }
}

export const CREATE_CONFIG = 'CREATE_CONFIG';
export const createConfig = config => ({
    type: CREATE_CONFIG,
    payload: { config },
});
