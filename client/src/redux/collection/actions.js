import axios from 'axios'
// import https from 'https'
import {
  FETCH_COLLECTIONS_REQUEST,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
  MARK_COLLECTION_AS_ACTIVE,
  REMOVE_COLLECTION
} from './collectionTypes'

export const addCollectionRequest = (data) => {
  return (dispatch) => {
    // dispatch(fetchCollectionsRequest())
    console.log('addCollectionRequest: ', data)
    axios
      .post('/api/collections', data)
      .then(response => {
        // response.data is the users
        const collections = response.data
        console.log('response.data.results: ', collections)
        // dispatch(fetchCollectionsSuccess(collections))
        // dispatch(createCollection(collections));

        // const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        // axios
        //   .post('https://192.168.2.236:5000/posts/new', data, { httpsAgent })
        //   .then(response => {
        //     // response.data is the users
        //     const collections = response.data
        //     console.log('response.data.results: ', collections)
        //     // dispatch(fetchCollectionsSuccess(collections))
        //     // dispatch(createCollection(collections));
        //   })
        //   .catch(error => {
        //     // error.message is the error message
        //     dispatch(fetchCollectionsFailure(error.message))
        //   })

      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchCollectionsFailure(error.message))
      })
  }
}
//removeCollectionRequest
export const removeCollectionRequest = (data) => {
  return (dispatch) => {
    // dispatch(fetchCollectionsRequest())
    console.log('removeCollectionRequest: ', data)
    axios
      .delete(`/api/collections/${data}`)
      .then(response => {
        // response.data is the users
        const collections = response.data
        console.log('response.data.results: ', collections)
        dispatch(removeCollection(collections));
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchCollectionsFailure(error.message))
      })
  }
}



export const fetchCollections = () => {
  return (dispatch) => {
    dispatch(fetchCollectionsRequest())
    axios
      .get('/api/collections')
      .then(response => {
        // response.data is the users
        const collections = response.data
        dispatch(fetchCollectionsSuccess(collections))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchCollectionsFailure(error.message))
      })
  }
}

export const fetchCollectionsRequest = () => {
  return {
    type: FETCH_COLLECTIONS_REQUEST
  }
}

export const fetchCollectionsSuccess = users => {
  return {
    type: FETCH_COLLECTIONS_SUCCESS,
    payload: users
  }
}

export const fetchCollectionsFailure = error => {
  return {
    type: FETCH_COLLECTIONS_FAILURE,
    payload: error
  }
}

export const markCollectionAsActiveRequest = collectionId => ({
  type: MARK_COLLECTION_AS_ACTIVE,
  payload: { collectionId },
});

export const removeCollection = collection => ({
  type: REMOVE_COLLECTION,
  payload: { collection },
});
