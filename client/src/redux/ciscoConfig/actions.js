import axios from 'axios'
// import https from 'https'
import {
  FETCH_CONFIGS_REQUEST,
  FETCH_CONFIGS_SUCCESS,
  FETCH_CONFIGS_FAILURE,
  MARK_CONFIG_AS_ACTIVE,
  REMOVE_CONFIG
} from './configTypes'

export const addConfigRequest = (data) => {
  return (dispatch) => {
    // dispatch(fetchConfigsRequest())
    console.log('addConfigRequest: ', data)
    axios
      .post('/api/configs', data)
      .then(response => {
        // response.data is the users
        const configs = response.data
        console.log('response.data.results: ', configs)
        // dispatch(fetchConfigsSuccess(configs))
        // dispatch(createConfig(configs));

        // const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        // axios
        //   .post('https://192.168.2.236:5000/posts/new', data, { httpsAgent })
        //   .then(response => {
        //     // response.data is the users
        //     const configs = response.data
        //     console.log('response.data.results: ', configs)
        //     // dispatch(fetchConfigsSuccess(configs))
        //     // dispatch(createConfig(configs));
        //   })
        //   .catch(error => {
        //     // error.message is the error message
        //     dispatch(fetchConfigsFailure(error.message))
        //   })

      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchConfigsFailure(error.message))
      })
  }
}
//removeConfigRequest
export const removeConfigRequest = (data) => {
  return (dispatch) => {
    // dispatch(fetchConfigsRequest())
    console.log('removeConfigRequest: ', data)
    axios
      .delete(`/api/configs/${data}`)
      .then(response => {
        // response.data is the users
        const configs = response.data
        console.log('response.data.results: ', configs)
        dispatch(removeConfig(configs));
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
        const configs = response.data
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

export const markConfigAsActiveRequest = configId => ({
  type: MARK_CONFIG_AS_ACTIVE,
  payload: { configId },
});

export const removeConfig = config => ({
  type: REMOVE_CONFIG,
  payload: { config },
});
