import axios from 'axios'
// import https from 'https'
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  MARK_PROJECT_AS_ACTIVE,
  REMOVE_PROJECT
} from './projectTypes'

export const addProjectRequest = (data) => {
  return (dispatch) => {
    // dispatch(fetchProjectsRequest())
    console.log('addProjectRequest: ', data)
    axios
      .post('/api/projects', data)
      .then(response => {
        // response.data is the users
        const projects = response.data
        console.log('response.data.results: ', projects)
        // dispatch(fetchProjectsSuccess(projects))
        // dispatch(createProject(projects));

        // const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        // axios
        //   .post('https://192.168.2.236:5000/posts/new', data, { httpsAgent })
        //   .then(response => {
        //     // response.data is the users
        //     const projects = response.data
        //     console.log('response.data.results: ', projects)
        //     // dispatch(fetchProjectsSuccess(projects))
        //     // dispatch(createProject(projects));
        //   })
        //   .catch(error => {
        //     // error.message is the error message
        //     dispatch(fetchProjectsFailure(error.message))
        //   })

      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchProjectsFailure(error.message))
      })
  }
}
//removeProjectRequest
export const removeProjectRequest = (data) => {
  return (dispatch) => {
    // dispatch(fetchProjectsRequest())
    console.log('removeProjectRequest: ', data)
    axios
      .delete(`/api/projects/${data}`)
      .then(response => {
        // response.data is the users
        const projects = response.data
        console.log('response.data.results: ', projects)
        dispatch(removeProject(projects));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchProjectsFailure(error.message))
      })
  }
}



export const fetchProjects = () => {
  return (dispatch) => {
    dispatch(fetchProjectsRequest())
    axios
      .get('/api/projects')
      .then(response => {
        // response.data is the users
        const projects = response.data
        dispatch(fetchProjectsSuccess(projects))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchProjectsFailure(error.message))
      })
  }
}

export const fetchProjectsRequest = () => {
  return {
    type: FETCH_PROJECTS_REQUEST
  }
}

export const fetchProjectsSuccess = users => {
  return {
    type: FETCH_PROJECTS_SUCCESS,
    payload: users
  }
}

export const fetchProjectsFailure = error => {
  return {
    type: FETCH_PROJECTS_FAILURE,
    payload: error
  }
}

export const markProjectAsActiveRequest = projectId => ({
  type: MARK_PROJECT_AS_ACTIVE,
  payload: { projectId },
});

export const removeProject = project => ({
  type: REMOVE_PROJECT,
  payload: { project },
});
