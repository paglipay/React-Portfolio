import {
  FETCH_COLLECTIONS_REQUEST,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
  MARK_COLLECTION_AS_ACTIVE,
  REMOVE_COLLECTION
} from './collectionTypes'

const initialState = {
  loading: false,
  collections: [],
  activeCollection: '',
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLLECTIONS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_COLLECTIONS_SUCCESS:
      return {
        loading: false,
        // collections: action.payload,
        // collections: state.collections.concat(action.payload),
        collections: action.payload,
        error: ''
      }
    case FETCH_COLLECTIONS_FAILURE:
      return {
        loading: false,
        collections: [],
        error: action.payload
      }

    case MARK_COLLECTION_AS_ACTIVE: {
      const { collectionId } = action.payload;
      console.log('action.payload: ', action.payload)
      return {
        ...state,
        activeCollection: state.collections.find(collection => collection._id === collectionId)
      };

      // return state
    }

    case REMOVE_COLLECTION: {
      const { collection: collectionObj } = action.payload;
      console.log('collectionObj: ', collectionObj)
      const out = state.collections.filter(collection => collection._id !== collectionObj._id)
      console.log('out: ', out)
      return {
        ...state,
        collections: out,
      };
    }
    // case CREATE_COLLECTION:
    //   return {
    //     ...state,
    //         collections: state.collections,
    //   }
    default: return state
  }
}

export default reducer
