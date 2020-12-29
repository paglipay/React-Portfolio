import {
  FETCH_FORMS_REQUEST,
  FETCH_FORMS_SUCCESS,
  FETCH_FORMS_FAILURE,
  MARK_FORM_AS_ACTIVE,
  REMOVE_FORM
} from './formTypes'

const initialState = {
  loading: false,
  forms: [],
  activeForm: '',
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORMS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_FORMS_SUCCESS:
      return {
        loading: false,
        // forms: action.payload,
        // forms: state.forms.concat(action.payload),
        forms: action.payload,
        error: ''
      }
    case FETCH_FORMS_FAILURE:
      return {
        loading: false,
        forms: [],
        error: action.payload
      }

    case MARK_FORM_AS_ACTIVE: {
      const { formId } = action.payload;
      console.log('action.payload: ', action.payload)
      return {
        ...state,
        activeForm: state.forms.find(form => form._id === formId)
      };

      // return state
    }

    case REMOVE_FORM: {
      const { form: formObj } = action.payload;
      console.log('formObj: ', formObj)
      const out = state.forms.filter(form => form._id !== formObj._id)
      console.log('out: ', out)
      return {
        ...state,
        forms: out,
      };
    }
    // case CREATE_FORM:
    //   return {
    //     ...state,
    //         forms: state.forms,
    //   }
    default: return state
  }
}

export default reducer
