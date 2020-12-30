import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  MARK_PROJECT_AS_ACTIVE,
  REMOVE_PROJECT
} from './projectTypes'

const initialState = {
  loading: false,
  projects: [],
  activeProject: '',
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_PROJECTS_SUCCESS:
      return {
        loading: false,
        // projects: action.payload,
        // projects: state.projects.concat(action.payload),
        projects: action.payload,
        error: ''
      }
    case FETCH_PROJECTS_FAILURE:
      return {
        loading: false,
        projects: [],
        error: action.payload
      }

    case MARK_PROJECT_AS_ACTIVE: {
      const { projectId } = action.payload;
      console.log('action.payload: ', action.payload)
      return {
        ...state,
        activeProject: state.projects.find(project => project._id === projectId)
      };

      // return state
    }

    case REMOVE_PROJECT: {
      const { project: projectObj } = action.payload;
      console.log('projectObj: ', projectObj)
      const out = state.projects.filter(project => project._id !== projectObj._id)
      console.log('out: ', out)
      return {
        ...state,
        projects: out,
      };
    }
    // case CREATE_PROJECT:
    //   return {
    //     ...state,
    //         projects: state.projects,
    //   }
    default: return state
  }
}

export default reducer
