import axios from 'axios'
// import https from 'https'
import {
  FETCH_FORMS_REQUEST,
  FETCH_FORMS_SUCCESS,
  FETCH_FORMS_FAILURE,
  MARK_FORM_AS_ACTIVE,
  REMOVE_FORM
} from './formTypes'

export const addFormRequest = (data) => {
  return (dispatch) => {
    // dispatch(fetchFormsRequest())
    console.log('addFormRequest: ', data)
    axios
      .post('/api/forms', data)
      .then(response => {
        // response.data is the users
        const forms = response.data
        console.log('response.data.results: ', forms)
        // dispatch(fetchFormsSuccess(forms))
        // dispatch(createForm(forms));

        // const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        // axios
        //   .post('https://192.168.2.236:5000/posts/new', data, { httpsAgent })
        //   .then(response => {
        //     // response.data is the users
        //     const forms = response.data
        //     console.log('response.data.results: ', forms)
        //     // dispatch(fetchFormsSuccess(forms))
        //     // dispatch(createForm(forms));
        //   })
        //   .catch(error => {
        //     // error.message is the error message
        //     dispatch(fetchFormsFailure(error.message))
        //   })

      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchFormsFailure(error.message))
      })
  }
}
//removeFormRequest
export const removeFormRequest = (data) => {
  return (dispatch) => {
    // dispatch(fetchFormsRequest())
    console.log('removeFormRequest: ', data)
    axios
      .delete(`/api/forms/${data}`)
      .then(response => {
        // response.data is the users
        const forms = response.data
        console.log('response.data.results: ', forms)
        dispatch(removeForm(forms));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchFormsFailure(error.message))
      })
  }
}



export const fetchForms = () => {
  return (dispatch) => {
    dispatch(fetchFormsRequest())
    axios
      .get('/api/forms')
      .then(response => {
        // response.data is the users
        const forms = response.data
        dispatch(fetchFormsSuccess(forms))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchFormsFailure(error.message))
      })
  }
}

export const fetchFormsRequest = () => {
  return {
    type: FETCH_FORMS_REQUEST
  }
}

export const fetchFormsSuccess = users => {
  return {
    type: FETCH_FORMS_SUCCESS,
    payload: users
  }
}

export const fetchFormsFailure = error => {
  return {
    type: FETCH_FORMS_FAILURE,
    payload: error
  }
}

export const markFormAsActiveRequest = formId => ({
  type: MARK_FORM_AS_ACTIVE,
  payload: { formId },
});

export const removeForm = form => ({
  type: REMOVE_FORM,
  payload: { form },
});
